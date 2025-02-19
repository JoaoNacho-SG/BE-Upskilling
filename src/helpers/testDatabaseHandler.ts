import { DataSource, DataSourceOptions } from "typeorm";
import { createDatabase, dropDatabase } from "typeorm-extension";
import { UserEntity } from "../database/entities/UserEntity";
import { CartEntity } from "../database/entities/ShoppingCartEntity";
import { config } from "dotenv";

config();

// TODO: Check this l8r

const dataSourceOpts: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  name: "test",
  database: "database-test",
  port: parseInt(process.env.DB_PORT || "5432"),
  // synchronize: true,
  dropSchema: true,
  migrations: [`${__dirname}/migrations/*`],
  entities: [UserEntity, CartEntity],
};

export class TestDatabaseHandler {
  private readonly initialDatabase: string;
  private readonly testDatabase = dataSourceOpts.database;
  public testDataSource: DataSource;

  constructor() {
    this.initialDatabase = process.env.DB_NAME || "postgres";
    const newDataSource = new DataSource(dataSourceOpts);
    this.testDataSource = newDataSource;
  }

  async createDatabase() {
    await this.dropDatabase();
    console.log(`Creating test database: ${this.testDatabase}`);
    await createDatabase({
      options: dataSourceOpts,
      initialDatabase: this.initialDatabase,
      ifNotExist: false,
    });

    await this.testDataSource.initialize();
    console.log(`Test database created: ${this.testDatabase}`);
    console.log("Running migrations...");
    await this.testDataSource.runMigrations();
    console.log("Migrations run successfully");
    console.log("Test database ready to accept connections");
  }

  async dropDatabase(dropAll = false) {
    if (dropAll) {
      this.testDataSource.initialize();
      await this.testDataSource.query(
        `SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${this.testDatabase}';`
      );
    }

    if (this.testDataSource.isInitialized) {
      console.log(`Dropping test database '${this.testDatabase}'`);

      await this.testDataSource.destroy();
      await dropDatabase({
        options: dataSourceOpts,
        initialDatabase: this.initialDatabase,
      });
    }
  }
}
