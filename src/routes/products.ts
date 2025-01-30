import express from "express";
import { PRODUCTS } from "../helpers/url-endpoints";
import { products } from "../data/products";

const productRoutes = express.Router();

productRoutes.get(PRODUCTS.LIST, (_req, res) => {
  res.status(200).json(products);
});

productRoutes.get(PRODUCTS.LIST, (req, res) => {
  const limit = req.query.limit;
  if (Number(limit) > 0) {
    res.status(200).json({
      message: `Showing ${limit} of ${products.length} results`,
    });
  } else {
    res.status(400).json({ message: "Invalid limit" });
  }
});

productRoutes.get(`${PRODUCTS.LIST}/:id`, (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.status(200).json(product);
});

productRoutes.post(PRODUCTS.ADD, (req, res) => {
  const { name, price, categories, description, related } = req.body;
  const newProduct = {
    id: String(products.length + 1),
    name,
    price,
    categories,
    description,
    related,
  };
  res.status(200).json(newProduct);
});

productRoutes.delete(`${PRODUCTS.LIST}/:id`, (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  res.status(200).json({ message: `${product.name} was deleted` });
});

productRoutes.put(`${PRODUCTS.LIST}/:id`, (req, res) => {
  const { id } = req.params;
  let product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const { name, price, categories, description, related } = req.body;
  product = { id, name, price, categories, description, related };
  res.status(200).json({ message: `${product.name} was updated` });
});

export default productRoutes;
