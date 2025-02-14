import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { createError } from "./errorHandlerFn";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const authTokenFn = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return next(createError("Access token not found", 401));

  jwt.verify(
    token,
    ACCESS_TOKEN_SECRET!,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) return next(createError("Invalid access token", 403));
      (req as any).email = decoded;
      next();
    }
  );
};
