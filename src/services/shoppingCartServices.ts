import { ShoppingCart } from "../schemas/userSchema";
import { ShoppingCartRepository } from "../database/repositories/ShoppingCartRepository";
import { createError } from "../middleware/errorHandlerFn";

export class ShoppingCartService {
  constructor(public shoppingCartRepository: ShoppingCartRepository) {}

  public async getShoppingCart(userid: number): Promise<ShoppingCart[]> {
    const shoppingCart = await this.shoppingCartRepository.getShoppingCart(
      userid
    );
    if (!shoppingCart) return [];
    return shoppingCart;
  }

  public async createShoppingCart(
    userid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    if (!userid || !cartname) throw createError("Cart name is required", 400);
    return await this.shoppingCartRepository.createShoppingCart(
      userid,
      cartname
    );
  }

  public async editShoppingCart(
    cartid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    if (!cartid || !cartname) throw createError("Cart name is required", 400);
    return await this.shoppingCartRepository.editShoppingCart(cartid, cartname);
  }

  public async deleteShoppingCart(cartid: number): Promise<ShoppingCart> {
    if (!cartid) throw createError("Cart ID is required", 400);
    const shoppingCart = await this.shoppingCartRepository.getOneCartById(
      cartid
    );
    if (!shoppingCart) throw createError("Shopping cart was not found", 404);
    return await this.shoppingCartRepository.deleteShoppingCart(cartid);
  }
}
