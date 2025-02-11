import { ShoppingCart } from "../schemas/userSchema";
import { ShoppingCartRepository } from "../database/repositories/ShoppingCartRepository";

export class ShoppingCartService {
  constructor(public shoppingCartRepository: ShoppingCartRepository) {}

  public async getShoppingCart(userid: number): Promise<ShoppingCart[]> {
    const shoppingCart = await this.shoppingCartRepository.getShoppingCart(
      userid
    );
    return shoppingCart;
  }

  public async createShoppingCart(
    userid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    const newShoppingCart =
      await this.shoppingCartRepository.createShoppingCart(userid, cartname);
    return newShoppingCart;
  }

  public async editShoppingCart(
    cartid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    const editedShoppingCart =
      await this.shoppingCartRepository.editShoppingCart(cartid, cartname);
    return editedShoppingCart;
  }

  public async deleteShoppingCart(cartid: number): Promise<ShoppingCart> {
    const deletedShoppingCart =
      await this.shoppingCartRepository.deleteShoppingCart(cartid);
    return deletedShoppingCart;
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
