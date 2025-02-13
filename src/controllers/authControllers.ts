import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { createError } from "../middleware/errorHandlerFn";
import { AuthService } from "../services/authServices";

dotenv.config();

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET ?? "my-super-secret-key";

export class AuthControllers {
  constructor(public authService: AuthService) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(createError("Email and password are required", 400));
    }
    const user = await this.authService.login(email, password);

    if (!user) {
      next(createError("Email or password is incorrect", 400));
    } else {
      const token = jwt.sign({ email: user?.email }, ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
      });
      res.status(200).json({ token, email: user?.email });
    }
  };
}
