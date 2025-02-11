import { DataSource } from "typeorm";
import { CartEntity } from "../entities/ShoppingCartEntity";
import { ShoppingCart } from "../../schemas/userSchema";

export class ShoppingCartRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async getShoppingCart(userid: number): Promise<ShoppingCart[]> {
    return this.dataSource
      .createQueryBuilder()
      .from(CartEntity, "shoppingCart")
      .select(["cartname", "first_name", "last_name"])
      .where("userid = :userid", { userid })
      .getMany();
  }

  public async createShoppingCart(
    userid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(CartEntity)
      .values({ userid, cartname })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async editShoppingCart(
    cartid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    return this.dataSource
      .createQueryBuilder()
      .update(CartEntity)
      .set({ cartname })
      .where("cartid = :cartid", { cartid })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async deleteShoppingCart(cartid: number): Promise<ShoppingCart> {
    return this.dataSource
      .createQueryBuilder()
      .delete()
      .from(CartEntity)
      .where("cartid = :cartid", { cartid })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }
}
