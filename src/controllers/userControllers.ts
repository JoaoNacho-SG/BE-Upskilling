import { NextFunction, Request, Response } from "express";
import * as userServices from "../services/userServices";
import { createError } from "../middleware/errorHandlerFn";

export const getAllUsers = async (req: Request, res: Response) => {
  const { limit } = req.query;
  const users = await userServices.getAllUsers({
    limit: limit ? Number(limit) : undefined,
  });
  res.status(200).json(users);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userid } = req.params;
  const user = await userServices.getUserById({ userid });

  if (!user) {
    next(createError("User was not found!", 404));
  }

  res.status(200).json(user);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { first, last } = req.body.name;
  const { email } = req.body;
  if (!first || !last || !email) {
    next(createError("Name and email are required", 400));
  }

  const newUser = await userServices.createUser({
    name: { first, last },
    email,
  });
  res.status(201).json(newUser);
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userid } = req.params;
  const { first, last } = req.body.name;
  const { email } = req.body;

  if (!userid) {
    next(createError("User was not found", 400));
  }

  if (!first || !last || !email) {
    next(createError("Name and email are required", 400));
  }

  const editedUser = await userServices.editUser({
    userid,
    name: { first, last },
    email,
  });
  res.status(200).json(editedUser);
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userid } = req.params;
  try {
    await userServices.deleteUser({ userid });
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      next(createError(error.message, 400));
    } else {
      next(createError("An unknown error occurred", 404));
    }
  }
};
