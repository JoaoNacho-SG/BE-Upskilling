import { UserEntity } from "../entities/UserEntity";
import { InsertUser, User } from "../../schemas/userSchema";
import { DataSource, Repository } from "typeorm";

export class UserRepository {
  private repository: Repository<UserEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserEntity);
  }

  public async getAllUsers(limit?: number): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      .select()
      .limit(limit ? limit : 100)
      .getMany();
  }

  public async getUserById(userid: number): Promise<User | null> {
    return this.repository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.cart", "cart")
      .where("user.userid = :userid", { userid })
      .getOne();
  }

  public async createUser(user: InsertUser): Promise<User> {
    return this.repository
      .createQueryBuilder()
      .insert()
      .values(user)
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async editUser(user: User): Promise<User> {
    return this.repository
      .createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where("userid = :userid", { userid: user.userid })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async deleteUser(userid: number): Promise<User> {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where("userid = :userid", { userid })
      .returning("*")
      .execute()
      .then((result) => result.raw[0]);
  }

  public async authenticateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    return this.repository
      .createQueryBuilder()
      .select()
      .where("email = :email AND password = :password", { email, password })
      .getOne();
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder()
      .where("email = :email", { email })
      .getOne();
  }
}
