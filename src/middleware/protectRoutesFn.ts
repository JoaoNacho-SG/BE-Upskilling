import { Request, Response, NextFunction } from "express";
import { authTokenFn } from "./authTokenFn";

const publicPaths = [`/api/login`, `/api/refresh-token`];

export const protectRoutesFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (publicPaths.includes(req.path)) {
    return next();
  }

  if (req.path === `/api/users` && req.method === "POST") {
    return next();
  }

  return authTokenFn(req, res, next);
};
