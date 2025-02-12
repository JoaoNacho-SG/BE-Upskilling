import express from "express";
import { USER } from "../helpers/url-endpoints";
import { UserControllers } from "../controllers/userControllers";
import { UserService } from "../services/userServices";
import { UserRepository } from "../database/repositories/UserRepository";
import { AppDataSource } from "../database/data-source";

const userRoutes = express.Router();
const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);
const userControllers = new UserControllers(userService);

userRoutes.get(USER.USERS, userControllers.getAllUsers);
userRoutes.get(USER.USER_BY_ID, userControllers.getUserById);
userRoutes.get(USER.USER_BY_EMAIL, userControllers.getUserByEmail);
userRoutes.post(USER.USERS, userControllers.createUser);
userRoutes.put(USER.USER_BY_ID, userControllers.editUser);
userRoutes.delete(USER.USER_BY_ID, userControllers.deleteUser);

export default userRoutes;
