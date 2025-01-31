import express from "express";
import { PRODUCTS } from "../helpers/url-endpoints";
import { products } from "../data/products";
import { createError } from "../middleware/errorHandlerFn";

const productRoutes = express.Router();

productRoutes.get(PRODUCTS.LIST, (req, res) => {
  const { limit } = req.query;
  if (limit) {
    res.status(200).json({
      data: products.slice(0, Number(limit)),
      message: `Showing ${limit} of ${products.length} results`,
    });
  } else {
    res.status(200).json(products);
  }
});

productRoutes.get(`${PRODUCTS.LIST}/:id`, (req, res, next) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  if (!product) {
    next(createError("Product not found", 404));
  } else {
    res.status(200).json(product);
  }
});

productRoutes.post(PRODUCTS.ADD, (req, res, next) => {
  const {
    name,
    price,
    categories = [],
    description = "",
    related = [],
  } = req.body;
  if (!name || !price) {
    next(createError("Name and price are required", 400));
  } else {
    const newProduct = {
      id: String(products.length + 1),
      name,
      price,
      categories,
      description,
      related,
    };
    res.status(200).json(newProduct);
  }
});

productRoutes.delete(`${PRODUCTS.LIST}/:id`, (req, res, next) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  if (!product) {
    next(createError("Product not found", 404));
  } else {
    res.status(200).json({ message: `${product.name} was deleted` });
  }
});

productRoutes.put(`${PRODUCTS.LIST}/:id`, (req, res, next) => {
  const { id } = req.params;
  const { name, price, categories, description, related } = req.body;
  let product = products.find((product) => product.id === id);

  if (!product) {
    next(createError("Product not found", 404));
  } else if (!req.body.name || !req.body.price) {
    next(createError("Name and price are required", 400));
  } else {
    product = { id, name, price, categories, description, related };
    res.status(200).json({ message: `${product.name} was updated` });
  }
});

export default productRoutes;
