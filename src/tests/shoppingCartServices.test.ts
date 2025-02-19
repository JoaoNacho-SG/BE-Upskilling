import { ShoppingCartService } from "../services/shoppingCartServices";
import { ShoppingCartRepository } from "../database/repositories/ShoppingCartRepository";
import { ShoppingCart } from "../schemas/userSchema";
import { AppDataSource } from "../database/data-source";

jest.mock("../database/repositories/ShoppingCartRepository");

describe("ShoppingCartService", () => {
  let shoppingCartService: ShoppingCartService;
  let mockShoppingCartRepository: jest.Mocked<ShoppingCartRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockShoppingCartRepository = new ShoppingCartRepository(
      AppDataSource
    ) as jest.Mocked<ShoppingCartRepository>;
    shoppingCartService = new ShoppingCartService(mockShoppingCartRepository);
  });

  describe("getShoppingCart", () => {
    it("should return empty array when no cart is found", async () => {
      mockShoppingCartRepository.getShoppingCart.mockResolvedValue([]);

      const result = await shoppingCartService.getShoppingCart(1);

      expect(result).toEqual([]);
      expect(mockShoppingCartRepository.getShoppingCart).toHaveBeenCalledWith(
        1
      );
    });

    it("should return shopping cart when found", async () => {
      const mockCart: ShoppingCart[] = [
        {
          cartid: 1,
          userid: 1,
          cartname: "Test Cart",
          user: {
            userid: 1,
            first_name: "Test",
            last_name: "User",
            email: "test@test.com",
            password: "password",
            cart: [],
          },
        },
      ];
      mockShoppingCartRepository.getShoppingCart.mockResolvedValue(mockCart);

      const result = await shoppingCartService.getShoppingCart(1);

      expect(result).toEqual(mockCart);
      expect(mockShoppingCartRepository.getShoppingCart).toHaveBeenCalledWith(
        1
      );
    });
  });

  describe("createShoppingCart", () => {
    it("should throw error when userid or cartname is missing", async () => {
      await expect(
        shoppingCartService.createShoppingCart(0, "")
      ).rejects.toThrow("Cart name is required");
    });

    it("should create shopping cart successfully", async () => {
      const mockCart: ShoppingCart = {
        cartid: 1,
        userid: 1,
        cartname: "New Cart",
        user: {
          userid: 1,
          first_name: "Test",
          last_name: "User",
          email: "test@test.com",
          password: "password",
          cart: [],
        },
      };
      mockShoppingCartRepository.createShoppingCart.mockResolvedValue(mockCart);

      const result = await shoppingCartService.createShoppingCart(
        1,
        "New Cart"
      );

      expect(result).toEqual(mockCart);
      expect(
        mockShoppingCartRepository.createShoppingCart
      ).toHaveBeenCalledWith(1, "New Cart");
    });
  });

  describe("editShoppingCart", () => {
    it("should throw error when cartid or cartname is missing", async () => {
      await expect(shoppingCartService.editShoppingCart(0, "")).rejects.toThrow(
        "Cart name is required"
      );
    });

    it("should edit shopping cart successfully", async () => {
      const mockCart: ShoppingCart = {
        cartid: 1,
        userid: 1,
        cartname: "Updated Cart",
      };
      mockShoppingCartRepository.editShoppingCart.mockResolvedValue(mockCart);

      const result = await shoppingCartService.editShoppingCart(
        1,
        "Updated Cart"
      );

      expect(result).toEqual(mockCart);
      expect(mockShoppingCartRepository.editShoppingCart).toHaveBeenCalledWith(
        1,
        "Updated Cart"
      );
    });
  });

  describe("deleteShoppingCart", () => {
    it("should throw error when cartid is missing", async () => {
      await expect(shoppingCartService.deleteShoppingCart(0)).rejects.toThrow(
        "Cart ID is required"
      );
    });

    it("should throw error when cart is not found", async () => {
      mockShoppingCartRepository.getOneCartById.mockResolvedValue(null);

      await expect(shoppingCartService.deleteShoppingCart(1)).rejects.toThrow(
        "Shopping cart was not found"
      );
    });

    it("should delete shopping cart successfully", async () => {
      const mockCart: ShoppingCart = {
        cartid: 1,
        userid: 1,
        cartname: "Cart to Delete",
      };
      mockShoppingCartRepository.getOneCartById.mockResolvedValue(mockCart);
      mockShoppingCartRepository.deleteShoppingCart.mockResolvedValue(mockCart);

      const result = await shoppingCartService.deleteShoppingCart(1);

      expect(result).toEqual(mockCart);
      expect(mockShoppingCartRepository.getOneCartById).toHaveBeenCalledWith(1);
      expect(
        mockShoppingCartRepository.deleteShoppingCart
      ).toHaveBeenCalledWith(1);
    });
  });
});
