import { UserEntity } from "../entities/UserEntity";
import { InsertUser, User } from "../../schemas/userSchema";
import { DataSource } from "typeorm";

export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  public async getAllUsers(limit?: number): Promise<User[]> {
    return this.dataSource
      .createQueryBuilder()
      .from(UserEntity, "users")
      .select()
      .limit(limit)
      .getMany();
  }

  public async getUserById(userid: number): Promise<User | null> {
    return this.dataSource
      .createQueryBuilder()
      .from(UserEntity, "users")
      .select()
      .where("userid = :userid", { userid })
      .getOne();
  }

  public async createUser(user: InsertUser): Promise<User> {
    return this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(user)
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async editUser(user: User): Promise<User> {
    return this.dataSource
      .createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where("userid = :userid", { userid: user.userid })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async deleteUser(userid: number): Promise<User> {
    return this.dataSource
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where("userid = :userid", { userid })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.dataSource
      .createQueryBuilder()
      .from(UserEntity, "users")
      .select()
      .where("email = :email", { email })
      .getOne();
  }
}
