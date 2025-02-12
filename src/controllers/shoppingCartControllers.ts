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
    if (!userid || !cartname) {
      next(createError("User ID and cart name are required", 400));
    }
    const newShoppingCart = await this.shoppingCartService.createShoppingCart(
      Number(userid),
      cartname
    );
    res.status(201).json(newShoppingCart);
  };

  public editShoppingCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartid } = req.params;
    const { cartname } = req.body;
    if (!cartid || !cartname) {
      next(createError("Cart ID and cart name are required", 400));
    }
    const editedShoppingCart = await this.shoppingCartService.editShoppingCart(
      Number(cartid),
      cartname
    );
    res.status(200).json(editedShoppingCart);
  };

  public deleteShoppingCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { cartid } = req.params;
    if (!cartid) {
      next(createError("Cart ID is required", 400));
    }
    const deletedShoppingCart =
      await this.shoppingCartService.deleteShoppingCart(Number(cartid));
    res.status(200).json(deletedShoppingCart);
  };

  // public addProduct = async (req: Request, res: Response, next: NextFunction) => {
  //   const { cartid } = req.params;
  //   const { productid } = req.body;
  //   if (!cartid || !productid) {
  //     next(createError("Cart ID and product ID are required", 400));
  //   }
  //   const newProduct = await this.shoppingCartService.addProduct({
  //     cartid: Number(cartid),
  //     productid: Number(productid),
  //   });
  //   res.status(201).json(newProduct);
  // }

  // public removeProduct = async (req: Request, res: Response, next: NextFunction) => {
  //   const { cartid } = req.params;
  //   const { productid } = req.body;
  //   if (!cartid || !productid) {
  //     next(createError("Cart ID and product ID are required", 400));
  //   }
  //   const removedProduct = await this.shoppingCartService.removeProduct({
  //     cartid: Number(cartid),
  //     productid: Number(productid),
  //   });
  //   res.status(200).json(removedProduct);
  // }
}
