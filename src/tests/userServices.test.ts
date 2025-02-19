import { UserService } from "../services/userServices";
import { UserRepository } from "../database/repositories/UserRepository";
import { User, InsertUser } from "../schemas/userSchema";
import { AppDataSource } from "../database/data-source";

jest.mock("../database/repositories/UserRepository");

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  const mockUser: User = {
    userid: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: "password123",
  };

  const mockInsertUser: InsertUser = {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    password: "password123",
  };

  beforeEach(() => {
    mockUserRepository = new UserRepository(
      AppDataSource
    ) as jest.Mocked<UserRepository>;
    userService = new UserService(mockUserRepository);
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const mockUsers = [mockUser];
      mockUserRepository.getAllUsers.mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers();
      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.getAllUsers).toHaveBeenCalled();
    });

    it("should return limited users when limit is provided", async () => {
      const mockUsers = [mockUser];
      mockUserRepository.getAllUsers.mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers(1);
      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.getAllUsers).toHaveBeenCalledWith(1);
    });
  });

  describe("getUserById", () => {
    it("should return user when found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(1);
    });

    it("should throw error when user not found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(userService.getUserById(1)).rejects.toThrow(
        "User was not found!"
      );
    });
  });

  describe("createUser", () => {
    it("should create user successfully", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);
      mockUserRepository.createUser.mockResolvedValue(mockUser);

      const result = await userService.createUser(mockInsertUser);
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith(
        mockInsertUser
      );
    });

    it("should throw error when user already exists", async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);

      await expect(userService.createUser(mockInsertUser)).rejects.toThrow(
        "User already exists!"
      );
    });

    it("should throw error when required fields are missing", async () => {
      const invalidUser = { ...mockInsertUser, first_name: "" };
      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await expect(userService.createUser(invalidUser)).rejects.toThrow(
        "Name and email are required"
      );
    });
  });

  describe("editUser", () => {
    it("should edit user successfully", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);
      mockUserRepository.editUser.mockResolvedValue(mockUser);

      const result = await userService.editUser(mockUser);
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.editUser).toHaveBeenCalledWith(mockUser);
    });

    it("should throw error when user not found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(userService.editUser(mockUser)).rejects.toThrow(
        "User was not found!"
      );
    });

    it("should throw error when required fields are missing", async () => {
      const invalidUser = { ...mockUser, first_name: "" };
      mockUserRepository.getUserById.mockResolvedValue(mockUser);

      await expect(userService.editUser(invalidUser)).rejects.toThrow(
        "Name and email are required"
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      mockUserRepository.getUserById.mockResolvedValue(mockUser);
      mockUserRepository.deleteUser.mockResolvedValue(mockUser);

      const result = await userService.deleteUser(1);
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(1);
    });

    it("should throw error when user not found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);

      await expect(userService.deleteUser(1)).rejects.toThrow(
        "User was not found!"
      );
    });
  });
});
