import * as jwt from "jsonwebtoken";
import { UserRepository } from "../database/repositories/UserRepository";
import { createError } from "../middleware/errorHandlerFn";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export class AuthService {
  constructor(public userRepository: UserRepository) {}

  public async login(email: string, password: string) {
    if (!email || !password)
      throw createError("Email and password are required", 400);
    const user = await this.userRepository.authenticateUser(email, password);
    if (!user) throw createError("Invalid email or password", 401);

    const accessToken = jwt.sign({ email: user?.email }, ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { email: user?.email },
      REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return { accessToken, refreshToken, user };
  }

  public async refreshToken(refreshToken: string) {
    if (!refreshToken) throw createError("No refresh token provided", 401);

    return new Promise<{ accessToken: string; email: string }>(
      (resolve, reject) => {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!,
          (err: jwt.VerifyErrors | null, decoded: any) => {
            if (err) {
              reject(new Error("Invalid refresh token"));
            }

            const accessToken = jwt.sign(
              { email: decoded.email },
              process.env.ACCESS_TOKEN_SECRET!,
              {
                expiresIn: "15m",
              }
            );

            resolve({ accessToken, email: decoded.email });
          }
        );
      }
    );
  }
}
