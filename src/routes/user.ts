import express from "express";
import { USER } from "../helpers/url-endpoints";
import * as userControllers from "../controllers/userControllers";

const userRoutes = express.Router();

userRoutes.get(USER.USERS, userControllers.getAllUsers);
userRoutes.get(USER.USER_BY_ID, userControllers.getUserById);
userRoutes.post(USER.USERS, userControllers.createUser);
userRoutes.put(USER.USER_BY_ID, userControllers.editUser);
userRoutes.delete(USER.USER_BY_ID, userControllers.deleteUser);

export default userRoutes;
