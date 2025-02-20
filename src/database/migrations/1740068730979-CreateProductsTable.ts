import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateProductsTable1740068730979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "productid",
            type: "serial",
            isPrimary: true,
            isNullable: false,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "price",
            type: "decimal",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "cart_products",
        columns: [
          {
            name: "cartid",
            type: "int",
            isNullable: false,
            isPrimary: true,
          },
          {
            name: "productid",
            type: "int",
            isNullable: false,
            isPrimary: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "cart_products",
      new TableForeignKey({
        columnNames: ["cartid"],
        referencedColumnNames: ["cartid"],
        referencedTableName: "shopping_cart",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "cart_products",
      new TableForeignKey({
        columnNames: ["productid"],
        referencedColumnNames: ["productid"],
        referencedTableName: "products",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cart_products");
    await queryRunner.dropTable("products");
  }
}
