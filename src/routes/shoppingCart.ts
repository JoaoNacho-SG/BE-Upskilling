import express from "express";
import { SHOPPING_CART } from "../helpers/url-endpoints";
import * as shoppingCartControllers from "../controllers/shoppingCartControllers";

const shoppingCartRoutes = express.Router();

shoppingCartRoutes.get(
  SHOPPING_CART.SHOPPING_CART_USER,
  shoppingCartControllers.getShoppingCart
);
shoppingCartRoutes.post(
  SHOPPING_CART.SHOPPING_CART_USER,
  shoppingCartControllers.createShoppingCart
);
shoppingCartRoutes.put(
  SHOPPING_CART.SHOPPING_CART_BY_ID,
  shoppingCartControllers.editShoppingCart
);
shoppingCartRoutes.delete(
  SHOPPING_CART.SHOPPING_CART_BY_ID,
  shoppingCartControllers.deleteShoppingCart
);
shoppingCartRoutes.post(
  SHOPPING_CART.SHOPPING_CART_PRODUCTS,
  shoppingCartControllers.addProduct
);
shoppingCartRoutes.delete(
  SHOPPING_CART.SHOPPING_CART_PRODUCTS,
  shoppingCartControllers.removeProduct
);
shoppingCartRoutes.get(
  SHOPPING_CART.SHOPPING_CART_PRODUCTS,
  shoppingCartControllers.getCartProducts
);

export default shoppingCartRoutes;
