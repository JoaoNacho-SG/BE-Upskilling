import { User } from "../schemas/userSchema";
import * as userQueries from "../db/queries/userQueries";

export const getAllUsers = async ({
  limit,
}: {
  limit?: number;
}): Promise<User[]> => {
  const users = await userQueries.getAllUsers({ limit });
  return users;
};

export const getUserById = async ({
  userid,
}: {
  userid: number;
}): Promise<User> => {
  const user = await userQueries.getUserById({ userid });
  return user;
};

export const createUser = async ({
  first_name,
  last_name,
  email,
}: {
  first_name: string;
  last_name: string;
  email: string;
}): Promise<User> => {
  const newUser = await userQueries.createUser({
    first_name,
    last_name,
    email,
  });
  return newUser;
};

export const editUser = async ({
  userid,
  first_name,
  last_name,
  email,
}: {
  userid: number;
  first_name: string;
  last_name: string;
  email: string;
}): Promise<User> => {
  const editedUser = await userQueries.editUser({
    userid,
    first_name,
    last_name,
    email,
  });
  return editedUser;
};

export const deleteUser = async ({
  userid,
}: {
  userid: number;
}): Promise<User> => {
  const deletedUser = await userQueries.deleteUser({ userid });
  return deletedUser;
};
