import { NextFunction, Request, Response } from "express";
import * as shoppingCartServices from "../services/shoppingCartServices";
import { createError } from "../middleware/errorHandlerFn";

export const getShoppingCart = async (req: Request, res: Response) => {
  const { userid } = req.params;
  const shoppingCart = await shoppingCartServices.getShoppingCart({ userid });
  res.status(200).json(shoppingCart);
};

export const createShoppingCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartname } = req.body;
  const { userid } = req.params;
  if (!userid || !cartname) {
    next(createError("User ID and cart name are required", 400));
  }
  const newShoppingCart = await shoppingCartServices.createShoppingCart({
    userid,
    cartname,
  });
  res.status(201).json(newShoppingCart);
};

export const editShoppingCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartid } = req.params;
  const { cartname } = req.body;
  if (!cartid || !cartname) {
    next(createError("Cart ID and cart name are required", 400));
  }
  const editedShoppingCart = await shoppingCartServices.editShoppingCart({
    cartid,
    cartname,
  });
  res.status(200).json(editedShoppingCart);
};

export const deleteShoppingCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartid } = req.params;
  if (!cartid) {
    next(createError("Cart ID is required", 400));
  }
  const deletedShoppingCart = await shoppingCartServices.deleteShoppingCart({
    cartid,
  });
  res.status(200).json(deletedShoppingCart);
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartid } = req.params;
  const { productid } = req.body;
  if (!cartid || !productid) {
    next(createError("Cart ID and product ID are required", 400));
  }
  const newProduct = await shoppingCartServices.addProduct({
    cartid,
    productid,
  });
  res.status(201).json(newProduct);
};

export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cartid } = req.params;
  const { productid } = req.body;
  if (!cartid || !productid) {
    next(createError("Cart ID and product ID are required", 400));
  }
  const removedProduct = await shoppingCartServices.removeProduct({
    cartid,
    productid,
  });
  res.status(200).json(removedProduct);
};

export const getCartProducts = async (req: Request, res: Response) => {
  const { cartid } = req.params;
  const products = await shoppingCartServices.getCartProducts({ cartid });
  res.status(200).json(products);
};
