import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { createError } from "../middleware/errorHandlerFn";
import { AuthService } from "../services/authServices";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export class AuthControllers {
  constructor(public authService: AuthService) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(createError("Email and password are required", 400));
      }

      const user = await this.authService.login(email, password);

      if (!user) {
        return next(createError("Email or password is incorrect", 400));
      }

      const accessToken = jwt.sign(
        { email: user?.email },
        ACCESS_TOKEN_SECRET!,
        {
          expiresIn: "15m",
        }
      );

      const refreshToken = jwt.sign(
        { email: user?.email },
        REFRESH_TOKEN_SECRET!,
        {
          expiresIn: "7d",
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accessToken, email: user?.email });
    } catch (error) {
      next(createError("Internal server error", 500));
    }
  };

  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return next(createError("No refresh token provided", 401));
      }

      jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET!,
        (err: jwt.VerifyErrors | null, decoded: any) => {
          if (err) {
            return next(createError("Invalid refresh token", 403));
          }

          const accessToken = jwt.sign(
            { email: decoded.email },
            ACCESS_TOKEN_SECRET!,
            {
              expiresIn: "15m",
            }
          );

          res.status(200).json({ accessToken, email: decoded.email });
        }
      );
    } catch (error) {
      next(createError("Internal server error", 500));
    }
  };

  public logout = async (_req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Bye, bye! Sayonara! Adios! Ciao!" });
  };
}
