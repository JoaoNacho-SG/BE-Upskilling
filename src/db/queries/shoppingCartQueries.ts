import { ShoppingCart } from "../../schemas/userSchema";
import pool from "../db";

export const getShoppingCart = async ({
  userid,
}: {
  userid: number;
}): Promise<ShoppingCart[]> => {
  const query = `SELECT * FROM shoppingcarts WHERE userid = $1`;
  const { rows } = await pool.query(query, [userid]);
  return rows;
};

export const createShoppingCart = async ({
  userid,
  cartname,
}: {
  userid: number;
  cartname: string;
}): Promise<ShoppingCart> => {
  const query = `INSERT INTO shoppingcarts (userid, cartname) VALUES ($1, $2) RETURNING *`;
  const { rows } = await pool.query(query, [userid, cartname]);
  return rows[0];
};

export const editShoppingCart = async ({
  cartid,
  cartname,
}: {
  cartid: number;
  cartname: string;
}): Promise<ShoppingCart> => {
  const query = `UPDATE shoppingcarts SET cartname = $1 WHERE cartid = $2 RETURNING *`;
  const { rows } = await pool.query(query, [cartname, cartid]);
  return rows[0];
};

export const deleteShoppingCart = async ({
  cartid,
}: {
  cartid: number;
}): Promise<ShoppingCart> => {
  const query = `DELETE FROM shoppingcarts WHERE cartid = $1 RETURNING *`;
  const { rows } = await pool.query(query, [cartid]);
  return rows[0];
};

export const addProduct = async ({
  cartid,
  productid,
}: {
  cartid: number;
  productid: number;
}): Promise<ShoppingCart> => {
  const query = `INSERT INTO cart_products (cartid, productid ) VALUES ($1, $2) RETURNING *`;
  const { rows } = await pool.query(query, [cartid, productid]);
  return rows[0];
};

export const removeProduct = async ({
  cartid,
  productid,
}: {
  cartid: number;
  productid: number;
}): Promise<ShoppingCart> => {
  const query = `DELETE FROM cart_products WHERE cartid = $1 AND productid = $2 RETURNING *`;
  const { rows } = await pool.query(query, [cartid, productid]);
  return rows[0];
};

export const getCartProducts = async ({
  cartid,
}: {
  cartid: number;
}): Promise<ShoppingCart[]> => {
  const query = `SELECT * FROM cart_products WHERE cartid = $1`;
  const { rows } = await pool.query(query, [cartid]);
  return rows;
};
