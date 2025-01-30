import express from "express";
import { USER } from "../helpers/url-endpoints";
import users from "../data/users";

const userRoutes = express.Router();

userRoutes.get(USER.LOGIN, (_req, res) => {
  res.status(200).json({ message: "Login" });
});

userRoutes.get(USER.LOGOUT, (_req, res) => {
  res.status(200).json({ message: "Logout" });
});

userRoutes.get(USER.SIGNUP, (_req, res) => {
  res.status(200).json({ message: "Signup" });
});

userRoutes.post(USER.SIGNUP, (req, res) => {
  const { first, last } = req.body.name;
  const { email } = req.body;
  const newUser = { userId: users.length + 1, name: { first, last }, email };
  res.status(200).json(newUser);
});

export default userRoutes;
