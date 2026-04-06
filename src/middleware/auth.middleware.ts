import { Request, Response, NextFunction } from "express";
import { hashToken } from "../utils/token";
import { redis } from "../redis";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return
    }

    const token = authHeader.split(" ")[1];
    const tokenHash = hashToken(token);

    const session = await redis.get(`session:${tokenHash}`);

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const data = JSON.parse(session);

    req.user = {
      id: data.userId,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};