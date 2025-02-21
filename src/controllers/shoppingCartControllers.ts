import { NextFunction, Request, Response } from "express";
import { createError } from "../middleware/errorHandlerFn";
import { ShoppingCartService } from "../services/shoppingCartServices";

export class ShoppingCartControllers {
  constructor(public shoppingCartService: ShoppingCartService) {}

  public getShoppingCart = async (req: Request, res: Response) => {
    const { userid } = req.params;
    const shoppingCart = await this.shoppingCartService.getShoppingCart(
      Number(userid)
    );
    res.status(200).json(shoppingCart);
  };

  public createShoppingCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartname, userid } = req.body;
    try {
      const newShoppingCart = await this.shoppingCartService.createShoppingCart(
        Number(userid),
        cartname
      );
      res.status(201).json(newShoppingCart);
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };

  public editShoppingCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartid } = req.params;
    const { cartname } = req.body;
    try {
      const editedShoppingCart =
        await this.shoppingCartService.editShoppingCart(
          Number(cartid),
          cartname
        );
      res.status(200).json(editedShoppingCart);
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };

  public deleteShoppingCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartid } = req.params;
    try {
      const deletedShoppingCart =
        await this.shoppingCartService.deleteShoppingCart(Number(cartid));
      res.status(200).json(deletedShoppingCart);
    } catch (error) {
      if (error instanceof Error) next(createError(error.message, 400));
      next(createError("An unknown error occurred", 500));
    }
  };
}
