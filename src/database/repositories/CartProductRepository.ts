import { DataSource, Repository } from "typeorm";
import { CartProductEntity } from "../entities/CartProductEntity";
import { InsertCartProduct } from "../../schemas/productSchema";

export class CartProductRepository {
  private repository: Repository<CartProductEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(CartProductEntity);
  }

  public async getCartProducts(cartid: number): Promise<CartProductEntity[]> {
    return this.repository
      .createQueryBuilder("cart_products")
      .leftJoinAndSelect("cart_products.product", "product")
      .where("cart_products.cartid = :cartid", { cartid })
      .getMany();
  }

  public async addProductToCart(
    cartid: number,
    productid: number
  ): Promise<InsertCartProduct> {
    return this.repository
      .createQueryBuilder()
      .insert()
      .values({
        cartid,
        productid,
      })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async removeProduct(cartid: number, productid: number) {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where("cartid = :cartid AND productid = :productid", {
        cartid,
        productid,
      })
      .execute();
  }
}
