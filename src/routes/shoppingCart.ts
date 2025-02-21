import express from "express";
import { SHOPPING_CART } from "../helpers/url-endpoints";
import { ShoppingCartRepository } from "../database/repositories/ShoppingCartRepository";
import { AppDataSource } from "../database/data-source";
import { ShoppingCartService } from "../services/shoppingCartServices";
import { ShoppingCartControllers } from "../controllers/shoppingCartControllers";

const shoppingCartRoutes = express.Router();
const shoppingCartRepository = new ShoppingCartRepository(AppDataSource);
const shoppingCartService = new ShoppingCartService(shoppingCartRepository);
const shoppingCartControllers = new ShoppingCartControllers(
  shoppingCartService
);

shoppingCartRoutes.get(
  SHOPPING_CART.SHOPPING_CART_USER,
  shoppingCartControllers.getShoppingCart
);
shoppingCartRoutes.post(
  SHOPPING_CART.SHOPPING_CART,
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

export default shoppingCartRoutes;
