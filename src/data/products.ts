import { Product } from "../schemas/productSchema";

export const products: Product[] = [
  {
    id: "1",
    name: "Product 1",
    price: 100,
    categories: ["cat1", "cat2"],
    description: "Description for product 1",
    related: ["2", "4"],
  },
  {
    id: "2",
    name: "Product 2",
    price: 150,
    categories: ["cat2", "cat3"],
    description: "Description for product 2",
    related: ["1", "3"],
  },
  {
    id: "3",
    name: "Product 3",
    price: 200,
    categories: ["cat1", "cat4"],
    description: "Description for product 3",
    related: ["1", "2"],
  },
  {
    id: "4",
    name: "Product 4",
    price: 14,
    categories: ["cat3", "cat4"],
    description: "Description for product 4",
    related: ["2", "1"],
  },
];
