import { NextFunction, Request, Response } from "express";
import { createError } from "../middleware/errorHandlerFn";
import { UserService } from "../services/userServices";

export class UserControllers {
  constructor(public userService: UserService) {}

  public getAllUsers = async (req: Request, res: Response) => {
    const { limit } = req.query;
    const users = await this.userService.getAllUsers(Number(limit));
    res.status(200).json(users);
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userid } = req.params;
    try {
      const user = await this.userService.getUserById(Number(userid));
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 404));
      next(createError("An unknown error occurred", 500));
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { first_name, last_name, email, password } = req.body;
    try {
      const newUser = await this.userService.createUser({
        first_name,
        last_name,
        email,
        password,
      });
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };

  public editUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userid } = req.params;
    const { first_name, last_name, email } = req.body;
    try {
      const editedUser = await this.userService.editUser({
        userid: Number(userid),
        first_name,
        last_name,
        email,
      });
      res.status(200).json(editedUser);
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userid } = req.params;
    try {
      await this.userService.deleteUser(Number(userid));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };
}
