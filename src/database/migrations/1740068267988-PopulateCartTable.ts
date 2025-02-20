import { MigrationInterface, QueryRunner } from "typeorm";
import shoppingCarts from "../../data/shoppingCarts";

export class PopulateCartTable1740068267988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("shopping_cart")
      .values(shoppingCarts)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("shopping_cart")
      .execute();
  }
}
