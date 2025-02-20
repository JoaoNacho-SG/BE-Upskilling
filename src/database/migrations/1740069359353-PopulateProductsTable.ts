import { MigrationInterface, QueryRunner } from "typeorm";
import { products } from "../../data/products";
import cartProducts from "../../data/cartProducts";

export class PopulateProductsTable1740069359353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("products", ["name", "price"])
      .values(products)
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("cart_products")
      .values(cartProducts)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("products")
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("cart_products")
      .execute();
  }
}
