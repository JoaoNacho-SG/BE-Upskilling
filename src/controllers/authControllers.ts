import { NextFunction, Request, Response } from "express";
import { createError } from "../middleware/errorHandlerFn";
import { AuthService } from "../services/authServices";

export class AuthControllers {
  constructor(public authService: AuthService) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const { accessToken, refreshToken, user } = await this.authService.login(
        email,
        password
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
    const { refreshToken } = req.cookies;
    try {
      const result = await this.authService.refreshToken(refreshToken);
      res
        .status(200)
        .json({ accessToken: result.accessToken, email: result.email });
    } catch (error) {
      next(createError("Internal server error", 500));
    }
  };

  public logout = async (_req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Bye, bye! Sayonara! Adios! Ciao!" });
  };
}
