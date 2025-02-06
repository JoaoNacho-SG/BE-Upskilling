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
  userid: string;
}): Promise<User> => {
  const user = await userQueries.getUserById({ userid });
  return user;
};

export const createUser = async ({
  name,
  email,
}: {
  name: { first: string; last: string };
  email: string;
}): Promise<User> => {
  const userid = Math.random().toString(36).substring(7);
  const newUser = await userQueries.createUser({ name, email, userid });
  return newUser;
};

export const editUser = async ({
  userid,
  name,
  email,
}: {
  userid: string;
  name: { first: string; last: string };
  email: string;
}): Promise<User> => {
  const editedUser = await userQueries.editUser({ userid, name, email });
  return editedUser;
};

export const deleteUser = async ({
  userid,
}: {
  userid: string;
}): Promise<User> => {
  const deletedUser = await userQueries.deleteUser({ userid });
  return deletedUser;
};
