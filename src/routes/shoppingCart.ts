import express from "express";
import { SHOPPING_CART } from "../helpers/url-endpoints";
import { ShoppingCartRepository } from "../database/repositories/ShoppingCartRepository";
import { AppDataSource } from "../database/data-source";
import { ShoppingCartService } from "../services/shoppingCartServices";
import { ShoppingCartControllers } from "../controllers/shoppingCartControllers";

const shoppingCartRoutes = express.Router();
const shoppingCartRepository = new ShoppingCartRepository(AppDataSource);
const cartService = new ShoppingCartService(shoppingCartRepository);
const cartControllers = new ShoppingCartControllers(cartService);

shoppingCartRoutes.get(
  SHOPPING_CART.SHOPPING_CART_USER,
  cartControllers.getShoppingCart
);
shoppingCartRoutes.post(
  SHOPPING_CART.SHOPPING_CART_USER,
  cartControllers.createShoppingCart
);
shoppingCartRoutes.put(
  SHOPPING_CART.SHOPPING_CART_BY_ID,
  cartControllers.editShoppingCart
);
shoppingCartRoutes.delete(
  SHOPPING_CART.SHOPPING_CART_BY_ID,
  cartControllers.deleteShoppingCart
);
// shoppingCartRoutes.post(
//   SHOPPING_CART.SHOPPING_CART_PRODUCTS,
//   cartControllers.addProduct
// );
// shoppingCartRoutes.delete(
//   SHOPPING_CART.SHOPPING_CART_PRODUCTS,
//   cartControllers.removeProduct
// );
// shoppingCartRoutes.get(
//   SHOPPING_CART.SHOPPING_CART_PRODUCTS,
//   cartControllers.getCartProducts
// );

export default shoppingCartRoutes;
