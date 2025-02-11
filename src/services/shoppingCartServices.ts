import { ShoppingCart } from "../schemas/userSchema";
import * as shoppingCartQueries from "../db/queries/shoppingCartQueries";

export const getShoppingCart = async ({
  userid,
}: {
  userid: number;
}): Promise<ShoppingCart[]> => {
  const shoppingCart = await shoppingCartQueries.getShoppingCart({
    userid: Number(userid),
  });
  return shoppingCart;
};

export const createShoppingCart = async ({
  userid,
  cartname,
}: {
  userid: number;
  cartname: string;
}): Promise<ShoppingCart> => {
  const newShoppingCart = await shoppingCartQueries.createShoppingCart({
    userid,
    cartname,
  });
  return newShoppingCart;
};

export const editShoppingCart = async ({
  cartid,
  cartname,
}: {
  cartid: number;
  cartname: string;
}): Promise<ShoppingCart> => {
  const editedShoppingCart = await shoppingCartQueries.editShoppingCart({
    cartid,
    cartname,
  });
  return editedShoppingCart;
};

export const deleteShoppingCart = async ({
  cartid,
}: {
  cartid: number;
}): Promise<ShoppingCart> => {
  const deletedShoppingCart = await shoppingCartQueries.deleteShoppingCart({
    cartid,
  });
  return deletedShoppingCart;
};

export const addProduct = async ({
  cartid,
  productid,
}: {
  cartid: number;
  productid: number;
}): Promise<ShoppingCart> => {
  const newProduct = await shoppingCartQueries.addProduct({
    cartid,
    productid,
  });
  return newProduct;
};

export const removeProduct = async ({
  cartid,
  productid,
}: {
  cartid: number;
  productid: number;
}): Promise<ShoppingCart> => {
  const removedProduct = await shoppingCartQueries.removeProduct({
    cartid,
    productid,
  });
  return removedProduct;
};

export const getCartProducts = async ({
  cartid,
}: {
  cartid: number;
}): Promise<ShoppingCart[]> => {
  const cartProducts = await shoppingCartQueries.getCartProducts({ cartid });
  return cartProducts;
};
