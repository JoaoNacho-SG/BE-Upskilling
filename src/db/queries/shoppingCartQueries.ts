import { ShoppingCart } from "../../schemas/userSchema";
import pool from "../db";

export const getShoppingCart = async ({
  userid,
}: {
  userid: string;
}): Promise<ShoppingCart[]> => {
  const query = `SELECT * FROM shoppingcarts WHERE userid = $1`;
  const { rows } = await pool.query(query, [userid]);
  return rows;
};

export const createShoppingCart = async ({
  cartid,
  userid,
  cartname,
}: {
  cartid: string;
  userid: string;
  cartname: string;
}): Promise<ShoppingCart> => {
  const query = `INSERT INTO shoppingcarts (cartid, userid, cartname) VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await pool.query(query, [cartid, userid, cartname]);
  return rows[0];
};

export const editShoppingCart = async ({
  cartid,
  cartname,
}: {
  cartid: string;
  cartname: string;
}): Promise<ShoppingCart> => {
  const query = `UPDATE shoppingcarts SET cartname = $1 WHERE cartid = $2 RETURNING *`;
  const { rows } = await pool.query(query, [cartname, cartid]);
  return rows[0];
};

export const deleteShoppingCart = async ({
  cartid,
}: {
  cartid: string;
}): Promise<ShoppingCart> => {
  const query = `DELETE FROM shoppingcarts WHERE cartid = $1 RETURNING *`;
  const { rows } = await pool.query(query, [cartid]);
  return rows[0];
};

export const addProduct = async ({
  cartid,
  productid,
}: {
  cartid: string;
  productid: string;
}): Promise<ShoppingCart> => {
  const query = `INSERT INTO cart_products (cartid, productid ) VALUES ($1, $2) RETURNING *`;
  const { rows } = await pool.query(query, [cartid, productid]);
  return rows[0];
};

export const removeProduct = async ({
  cartid,
  productid,
}: {
  cartid: string;
  productid: string;
}): Promise<ShoppingCart> => {
  const query = `DELETE FROM cart_products WHERE cartid = $1 AND productid = $2 RETURNING *`;
  const { rows } = await pool.query(query, [cartid, productid]);
  return rows[0];
};

export const getCartProducts = async ({
  cartid,
}: {
  cartid: string;
}): Promise<ShoppingCart[]> => {
  const query = `SELECT * FROM cart_products WHERE cartid = $1`;
  const { rows } = await pool.query(query, [cartid]);
  return rows;
};
