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
    const user = await this.userService.getUserById(Number(userid));

    if (!user) {
      next(createError("User was not found!", 404));
    }

    res.status(200).json(user);
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      next(createError("Name and email are required", 400));
    }

    const newUser = await this.userService.createUser({
      first_name,
      last_name,
      email,
      password,
    });
    res.status(201).json(newUser);
  };

  public editUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userid } = req.params;
    const { first_name, last_name, email } = req.body;

    if (!userid) {
      next(createError("User was not found", 400));
    }

    if (!first_name || !last_name || !email) {
      next(createError("Name and email are required", 400));
    }

    const editedUser = await this.userService.editUser({
      userid: Number(userid),
      first_name,
      last_name,
      email,
    });
    res.status(200).json(editedUser);
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
      if (error instanceof Error) {
        next(createError(error.message, 400));
      } else {
        next(createError("An unknown error occurred", 404));
      }
    }
  };
}
