import bcrypt from "bcryptjs";
import { generateToken, hashToken } from "../../utils/token";
import { redis } from "../../redis";
import userRepository from "../user/user.repository";
import { KeycloakTokenResponse } from "../../types/auth.type";

const ACCESS_TTL = 60 * 15;
const REFRESH_TTL = 60 * 60 * 24 * 7;

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = generateToken();
  const refreshToken = generateToken();

  const accessTokenHash = hashToken(accessToken);
  const refreshTokenHash = hashToken(refreshToken);

  const pipeline = redis.multi();

  pipeline.set(
    `refresh:${refreshTokenHash}`,
    JSON.stringify({ userId: user.id }),
    { EX: REFRESH_TTL }
  );

  pipeline.sAdd(`user_refresh:${user.id}`, refreshTokenHash);

  pipeline.set(
    `session:${accessTokenHash}`,
    JSON.stringify({ userId: user.id }),
    { EX: ACCESS_TTL }
  );

  await pipeline.exec();

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    },
    accessToken,
    refreshToken,
  };
};

export const refresh = async (refreshToken: string): Promise<KeycloakTokenResponse> => {
  const tokenUrl = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: process.env.KEYCLOAK_CLIENT_ID!,
    refresh_token: refreshToken,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("error");
  }

  return data as KeycloakTokenResponse;
};

const callback = async (code: string): Promise<KeycloakTokenResponse> => {
  const tokenUrl = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.KEYCLOAK_CLIENT_ID!,
    code,
    redirect_uri: process.env.KEYCLOAK_REDIRECT_URI!,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("error")
  }

  return data as KeycloakTokenResponse;
}
export default {
  login,
  refresh,
  callback
};