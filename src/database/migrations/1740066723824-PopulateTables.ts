import { MigrationInterface, QueryRunner } from "typeorm";
import users from "../../data/users";

export class PopulateTables1740066723824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("users")
      .values(users)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from("users")
      .execute();
  }
}
