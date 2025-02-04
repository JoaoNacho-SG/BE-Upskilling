import { User } from "../../schemas/userSchema";
import pool from "../db";

export const getAllUsers = async ({
  limit,
}: {
  limit?: number;
}): Promise<User[]> => {
  const query = `SELECT * FROM users ${limit ? `LIMIT ${limit}` : ""}`;
  const { rows } = await pool.query(query);
  return rows;
};

export const getUserById = async ({ id }: { id: string }): Promise<User> => {
  const query = `SELECT * FROM users WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const createUser = async ({
  name,
  email,
}: {
  name: { first: string; last: string };
  email: string;
}): Promise<User> => {
  const query = `INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await pool.query(query, [name.first, name.last, email]);
  return rows[0];
};

export const editUser = async ({
  id,
  name,
  email,
}: {
  id: string;
  name: { first: string; last: string };
  email: string;
}): Promise<User> => {
  const query = `UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *`;
  const { rows } = await pool.query(query, [name.first, name.last, email, id]);
  return rows[0];
};

export const deleteUser = async ({ id }: { id: string }): Promise<User> => {
  const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
