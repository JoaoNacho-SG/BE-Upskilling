import { ShoppingCart } from "../schemas/userSchema";
import { ShoppingCartRepository } from "../database/repositories/ShoppingCartRepository";

export class ShoppingCartService {
  constructor(public shoppingCartRepository: ShoppingCartRepository) {}

  public async getShoppingCart(userid: number): Promise<ShoppingCart[]> {
    return await this.shoppingCartRepository.getShoppingCart(userid);
  }

  public async createShoppingCart(
    userid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    return await this.shoppingCartRepository.createShoppingCart(
      userid,
      cartname
    );
  }

  public async editShoppingCart(
    cartid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    return await this.shoppingCartRepository.editShoppingCart(cartid, cartname);
  }

  public async deleteShoppingCart(cartid: number): Promise<ShoppingCart> {
    return await this.shoppingCartRepository.deleteShoppingCart(cartid);
  }

  // public async addProduct({
  //   cartid,
  //   productid,
  // }: {
  //   cartid: number;
  //   productid: number;
  // }): Promise<ShoppingCart> {
  //   const newProduct = await shoppingCartQueries.addProduct({
  //     cartid,
  //     productid,
  //   });
  //   return newProduct;
  // }

  // public async removeProduct({
  //   cartid,
  //   productid,
  // }: {
  //   cartid: number;
  //   productid: number;
  // }): Promise<ShoppingCart> {
  //   const removedProduct = await shoppingCartQueries.removeProduct({
  //     cartid,
  //     productid,
  //   });
  //   return removedProduct;
  // }
}
