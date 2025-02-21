import express from "express";
import { PRODUCT } from "../helpers/url-endpoints";
import { CartProductRepository } from "../database/repositories/CartProductRepository";
import { AppDataSource } from "../database/data-source";
import { CartProductService } from "../services/cartProductServices";
import { CartProductControllers } from "../controllers/cartProductsController";

const cartProductRoutes = express.Router();
const cartProductRepository = new CartProductRepository(AppDataSource);
const cartProductService = new CartProductService(cartProductRepository);
const cartProductControllers = new CartProductControllers(cartProductService);

cartProductRoutes.get(
  PRODUCT.CART_PRODUCTS_BY_ID,
  cartProductControllers.getCartProducts
);
cartProductRoutes.post(
  PRODUCT.CART_PRODUCTS_BY_ID,
  cartProductControllers.addProduct
);
cartProductRoutes.delete(
  PRODUCT.CART_PRODUCTS_BY_ID,
  cartProductControllers.removeProduct
);

export default cartProductRoutes;
