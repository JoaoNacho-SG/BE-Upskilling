import express from "express";
import { AppDataSource } from "../database/data-source";
import { UserRepository } from "../database/repositories/UserRepository";
import { AuthService } from "../services/authServices";
import { AuthControllers } from "../controllers/authControllers";
import { AUTH } from "../helpers/url-endpoints";

const authRoutes = express.Router();

const userRepository = new UserRepository(AppDataSource);
const authService = new AuthService(userRepository);
const authControllers = new AuthControllers(authService);

authRoutes.post(AUTH.LOGIN, authControllers.login);
authRoutes.post(AUTH.REFRESH_TOKEN, authControllers.refreshToken);
authRoutes.post(AUTH.LOGOUT, authControllers.logout);

export default authRoutes;
