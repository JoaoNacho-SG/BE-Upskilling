import { ShoppingCart } from "../schemas/userSchema";
import * as shoppingCartQueries from "../db/queries/shoppingCartQueries";

export const getShoppingCart = async ({
  userid,
}: {
  userid: string;
}): Promise<ShoppingCart[]> => {
  const shoppingCart = await shoppingCartQueries.getShoppingCart({ userid });
  return shoppingCart;
};

export const createShoppingCart = async ({
  userid,
  cartname,
}: {
  userid: string;
  cartname: string;
}): Promise<ShoppingCart> => {
  const cartid = Math.random().toString(36).substring(7);
  const newShoppingCart = await shoppingCartQueries.createShoppingCart({
    cartid,
    userid,
    cartname,
  });
  return newShoppingCart;
};

export const editShoppingCart = async ({
  cartid,
  cartname,
}: {
  cartid: string;
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
  cartid: string;
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
  cartid: string;
  productid: string;
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
  cartid: string;
  productid: string;
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
  cartid: string;
}): Promise<ShoppingCart[]> => {
  const cartProducts = await shoppingCartQueries.getCartProducts({ cartid });
  return cartProducts;
};
