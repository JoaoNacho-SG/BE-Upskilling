import { InsertUser, User } from "../schemas/userSchema";
import { UserRepository } from "../database/repositories/UserRepository";

export class UserService {
  constructor(public userRepository: UserRepository) {}

  public async getAllUsers(limit?: number): Promise<User[]> {
    return this.userRepository.getAllUsers(limit);
  }

  public async getUserById(userid: number): Promise<User | null> {
    return this.userRepository.getUserById(userid);
  }

  public async createUser(user: InsertUser): Promise<User> {
    return this.userRepository.createUser(user);
  }

  public async editUser(user: User): Promise<User> {
    return this.userRepository.editUser(user);
  }

  public async deleteUser(userid: number): Promise<User> {
    return this.userRepository.deleteUser(userid);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }
}
