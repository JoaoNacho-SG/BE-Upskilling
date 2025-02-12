import { DataSource, Repository } from "typeorm";
import { CartEntity } from "../entities/ShoppingCartEntity";
import { ShoppingCart } from "../../schemas/userSchema";

export class ShoppingCartRepository {
  private repository: Repository<CartEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(CartEntity);
  }

  public async getShoppingCart(userid: number): Promise<ShoppingCart[]> {
    // return this.repository
    //   .createQueryBuilder()
    //   .select(["cartname", "first_name", "last_name"])
    //   .where("userid = :userid", { userid })
    //   .getMany();
    return [] as any;
  }

  public async createShoppingCart(
    userid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    return this.repository
      .createQueryBuilder()
      .insert()
      .values({ userid, cartname })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async editShoppingCart(
    cartid: number,
    cartname: string
  ): Promise<ShoppingCart> {
    return this.repository
      .createQueryBuilder()
      .update(CartEntity)
      .set({ cartname })
      .where("cartid = :cartid", { cartid })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async deleteShoppingCart(cartid: number): Promise<ShoppingCart> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where("cartid = :cartid", { cartid })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }
}
