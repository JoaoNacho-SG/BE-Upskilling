import { NextFunction, Request, Response } from "express";
import { createError } from "../middleware/errorHandlerFn";
import { CartProductService } from "../services/cartProductServices";

export class CartProductControllers {
  constructor(public cartProductService: CartProductService) {}

  public getCartProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartid } = req.params;
    try {
      const cartProducts = await this.cartProductService.getCartProducts(
        Number(cartid)
      );
      res.status(200).json(cartProducts);
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };

  public addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartid } = req.params;
    const { productid } = req.body;
    try {
      const newCartProduct = await this.cartProductService.addProduct(
        Number(cartid),
        productid
      );
      res.status(201).json(newCartProduct);
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };

  public removeProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartid } = req.params;
    const { productid } = req.body;
    try {
      await this.cartProductService.removeProduct(Number(cartid), productid);
      res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };
}
