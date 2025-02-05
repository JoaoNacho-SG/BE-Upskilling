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
  userid: string;
}): Promise<User> => {
  const query = `SELECT * FROM users WHERE userid = $1`;
  const { rows } = await pool.query(query, [userid]);
  return rows[0];
};

export const createUser = async ({
  name,
  email,
  userid,
}: {
  name: { first: string; last: string };
  email: string;
  userid: string;
}): Promise<User> => {
  const query = `INSERT INTO users (first_name, last_name, email, userid) VALUES ($1, $2, $3, $4) RETURNING *`;
  const { rows } = await pool.query(query, [
    name.first,
    name.last,
    email,
    userid,
  ]);
  return rows[0];
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
  const query = `UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE userid = $4 RETURNING *`;
  const { rows } = await pool.query(query, [
    name.first,
    name.last,
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
