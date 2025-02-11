import { DataSource } from "typeorm";
import "reflect-metadata";
import { CreateTables1739276837056 } from "./migrations/1739276837056-CreateTables";
import { UserEntity } from "./entities/UserEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || "5433"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "s!JQc9@F",
  database: process.env.DB_NAME || "postgres",
  synchronize: true,
  logging: true,
  entities: [UserEntity],
  subscribers: [],
  migrations: [CreateTables1739276837056],
});
