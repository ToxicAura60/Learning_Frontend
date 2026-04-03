import bcrypt from "bcryptjs";
import { generateToken, hashToken } from "../../utils/token";
import { redis } from "../../redis";
import userRepository from "../user/user.repository";

const ACCESS_TTL = 60 * 15;
const REFRESH_TTL = 60 * 60 * 24 * 7;

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await userRepository.getUserByEmail(email);

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
    user,
    accessToken,
    refreshToken,
  };
};

const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new Error("Unauthorized");

  const refreshTokenHash = hashToken(refreshToken);

  const data = await redis.get(`refresh:${refreshTokenHash}`);
  if (!data) throw new Error("Unauthorized");

  const { userId } = JSON.parse(data);

  const newAccessToken = generateToken();
  const newRefreshToken = generateToken();

  const newAccessHash = hashToken(newAccessToken);
  const newRefreshHash = hashToken(newRefreshToken);

  const pipeline = redis.multi();

  pipeline.del(`refresh:${refreshTokenHash}`);
  pipeline.sRem(`user_refresh:${userId}`, refreshTokenHash);

  pipeline.set(
    `refresh:${newRefreshHash}`,
    JSON.stringify({ userId }),
    { EX: REFRESH_TTL }
  );

  pipeline.sAdd(`user_refresh:${userId}`, newRefreshHash);

  pipeline.set(
    `session:${newAccessHash}`,
    JSON.stringify({ userId }),
    { EX: ACCESS_TTL }
  );

  await pipeline.exec();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export default {
  login,
  refresh,
};