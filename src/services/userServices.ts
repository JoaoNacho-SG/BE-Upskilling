import { InsertUser, User } from "../schemas/userSchema";
import { UserRepository } from "../database/repositories/UserRepository";
import { createError } from "../middleware/errorHandlerFn";

export class UserService {
  constructor(public userRepository: UserRepository) {}

  public async getAllUsers(limit?: number): Promise<User[]> {
    return this.userRepository.getAllUsers(limit);
  }

  public async getUserById(userid: number): Promise<User | null> {
    const user = await this.userRepository.getUserById(userid);
    if (!user) throw createError("User was not found!", 404);
    return user;
  }

  public async createUser(user: InsertUser): Promise<User> {
    const userToCreate = await this.userRepository.getUserByEmail(user.email);
    if (userToCreate) throw createError("User already exists!", 400);
    if (!user.first_name || !user.last_name || !user.email || !user.password)
      throw createError("Name and email are required", 400);
    return this.userRepository.createUser(user);
  }

  public async editUser(user: User): Promise<User> {
    const userToEdit = await this.getUserById(user.userid);
    if (!userToEdit) throw createError("User was not found!", 404);
    if (!user.first_name || !user.last_name || !user.email)
      throw createError("Name and email are required", 400);
    return this.userRepository.editUser(user);
  }

  public async deleteUser(userid: number): Promise<User> {
    const userToDelete = await this.getUserById(userid);
    if (!userToDelete) throw createError("User was not found!", 404);
    return this.userRepository.deleteUser(userid);
  }
}
