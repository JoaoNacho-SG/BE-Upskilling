import express from "express";
import { USER } from "../helpers/url-endpoints";

const userRoutes = express.Router();

userRoutes.get(USER.LOGIN, (_req, res) => {
  res.send(`<form action="/submit" method="post">
      <input type="text" name="name" placeholder="Name">
      <input type="email" name="email" placeholder="Email">
      <button type="submit">Submit</button>
    </form>`);
});

userRoutes.get(USER.LOGOUT, (_req, res) => {
  res.send("<h1>Goodbye</h1>");
});

userRoutes.get(USER.SIGNUP, (_req, res) => {
  res.send(`<h1>Signup</h1><br/><form action="/submit" method="post">
      <input type="text" name="name" placeholder="Name">
      <input type="email" name="email" placeholder="Email">
      <button type="submit">Submit</button>
    </form>`);
});

export default userRoutes;
