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

export const getUserById = async ({
  userid,
}: {
  userid: number;
}): Promise<User> => {
  const query = `SELECT * FROM users WHERE userid = $1`;
  const { rows } = await pool.query(query, [userid]);
  return rows[0];
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
  const query = `INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await pool.query(query, [first_name, last_name, email]);
  return rows[0];
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
  const query = `UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE userid = $4 RETURNING *`;
  const { rows } = await pool.query(query, [
    first_name,
    last_name,
    email,
    userid,
  ]);
  return rows[0];
};

export const deleteUser = async ({
  userid,
}: {
  userid: string;
}): Promise<User> => {
  const query = `DELETE FROM users WHERE userid = $1 RETURNING *`;
  const { rows } = await pool.query(query, [userid]);
  return rows[0];
};
