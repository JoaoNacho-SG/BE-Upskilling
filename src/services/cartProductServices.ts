import { createError } from "../middleware/errorHandlerFn";
import { CartProductRepository } from "../database/repositories/CartProductRepository";
import { InsertCartProduct } from "../schemas/productSchema";
import { CartProductEntity } from "../database/entities/CartProductEntity";

export class CartProductService {
  constructor(public cartProductRepository: CartProductRepository) {}

  public async getCartProducts(cartid: number): Promise<CartProductEntity[]> {
    const cartProducts = await this.cartProductRepository.getCartProducts(
      cartid
    );
    if (!cartProducts) return [];
    return cartProducts;
  }

  public async addProduct(
    cartid: number,
    productid: number
  ): Promise<InsertCartProduct> {
    if (!cartid || !productid)
      throw createError("Cart ID and product ID are required", 400);
    return this.cartProductRepository.addProductToCart(cartid, productid);
  }

  public async removeProduct(cartid: number, productid: number) {
    if (!cartid) throw createError("Cart ID is required", 400);
    const cartProduct = await this.cartProductRepository.getCartProducts(
      cartid
    );
    if (!cartProduct) throw createError("Cart product not found", 404);
    return this.cartProductRepository.removeProduct(cartid, productid);
  }
}
