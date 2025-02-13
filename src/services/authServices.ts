import { UserRepository } from "../database/repositories/UserRepository";

export class AuthService {
  constructor(public userRepository: UserRepository) {}

  public async login(email: string, password: string) {
    return await this.userRepository.authenticateUser(email, password);
  }
}
