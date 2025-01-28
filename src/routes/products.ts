import express from "express";
import { PRODUCTS } from "../helpers/url-endpoints";
import { products } from "../data/products";

const productRoutes = express.Router();

productRoutes.get(PRODUCTS.LIST, (_req, res) => {
  res.send(products);
});

export default productRoutes;
