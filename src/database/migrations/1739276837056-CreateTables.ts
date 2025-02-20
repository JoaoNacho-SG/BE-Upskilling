import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTables1739276837056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "userid",
            type: "serial",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "first_name",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "last_name",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "email",
            isUnique: true,
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            length: "10",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "shopping_cart",
        columns: [
          {
            name: "cartid",
            type: "serial",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "userid",
            type: "int",
            isNullable: false,
          },
          {
            name: "cartname",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("shopping_cart");
  }
}
