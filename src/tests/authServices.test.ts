import { AuthService } from "../services/authServices";
import { UserRepository } from "../database/repositories/UserRepository";
import { AppDataSource } from "../database/data-source";
import * as jwt from "jsonwebtoken";

jest.mock("../database/repositories/UserRepository");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserRepository = new UserRepository(
      AppDataSource
    ) as jest.Mocked<UserRepository>;
    authService = new AuthService(mockUserRepository);
  });

  describe("login", () => {
    const mockUser = {
      userid: 1,
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      password: "password123",
    };

    it("should successfully login with valid credentials", async () => {
      mockUserRepository.authenticateUser.mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce("mock-access-token")
        .mockReturnValueOnce("mock-refresh-token");

      const result = await authService.login(mockUser.email, mockUser.password);

      expect(mockUserRepository.authenticateUser).toHaveBeenCalledWith(
        mockUser.email,
        mockUser.password
      );
      expect(result).toEqual({
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        user: mockUser,
      });
    });

    it("should throw error when email is missing", async () => {
      await expect(authService.login("", "password123")).rejects.toThrow(
        "Email and password are required"
      );
    });

    it("should throw error when password is missing", async () => {
      await expect(authService.login("test@example.com", "")).rejects.toThrow(
        "Email and password are required"
      );
    });

    it("should throw error with invalid credentials", async () => {
      mockUserRepository.authenticateUser.mockResolvedValue(null);

      await expect(
        authService.login("test@example.com", "wrongpassword")
      ).rejects.toThrow("Invalid email or password");
    });
  });

  describe("refreshToken", () => {
    it("should successfully refresh token", async () => {
      const mockEmail = "test@example.com";
      const mockRefreshToken = "valid-refresh-token";

      (jwt.verify as jest.Mock).mockImplementation(
        (_token, _secret, callback) => {
          callback(null, { email: mockEmail });
        }
      );

      (jwt.sign as jest.Mock).mockReturnValue("new-access-token");

      const result = await authService.refreshToken(mockRefreshToken);

      expect(result).toEqual({
        accessToken: "new-access-token",
        email: mockEmail,
      });
    });

    it("should throw error when refresh token is missing", async () => {
      await expect(authService.refreshToken("")).rejects.toThrow(
        "No refresh token provided"
      );
    });

    it("should throw error when refresh token is invalid", async () => {
      const mockRefreshToken = "invalid-refresh-token";

      (jwt.verify as jest.Mock).mockImplementation(
        (_token, _secret, callback) => {
          callback(new Error("Invalid refresh token"), null);
        }
      );

      await expect(authService.refreshToken(mockRefreshToken)).rejects.toThrow(
        "Invalid refresh token"
      );
    });
  });
});
