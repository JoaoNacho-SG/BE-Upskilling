import { User } from "../schemas/userSchema";

const users: User[] = [
  {
    userId: "1",
    email: "some1@some.com",
    name: { first: "John", last: "Doe" },
    shoppingCarts: [
      {
        cartId: "cart1",
        products: ["1", "2", "3"],
        cartName: "Groceries",
        totalPrice: "100.00",
        totalWeight: "10kg",
      },
      {
        cartId: "cart99",
        products: ["1", "2", "3"],
        cartName: "Essentials",
        totalPrice: "199.99",
        totalWeight: "600kg",
      },
    ],
  },
  {
    userId: "2",
    email: "some2@some.com",
    name: { first: "Jane", last: "Smith" },
    shoppingCarts: [
      {
        cartId: "cart2",
        products: ["6"],
        cartName: "Electronics",
        totalPrice: "200.00",
        totalWeight: "5kg",
      },
    ],
  },
  {
    userId: "3",
    email: "some3@some.com",
    name: { first: "Alice", last: "Johnson" },
    shoppingCarts: [
      {
        cartId: "cart3",
        products: ["9"],
        cartName: "Clothing",
        totalPrice: "150.00",
        totalWeight: "3kg",
      },
    ],
  },
  {
    userId: "4",
    email: "some4@some.com",
    name: { first: "Bob", last: "Brown" },
    shoppingCarts: [
      {
        cartId: "cart4",
        products: ["1"],
        cartName: "Books",
        totalPrice: "50.00",
        totalWeight: "2kg",
      },
    ],
  },
  {
    userId: "5",
    email: "some5@some.com",
    name: { first: "Charlie", last: "Davis" },
    shoppingCarts: [
      {
        cartId: "cart5",
        products: ["8"],
        cartName: "Toys",
        totalPrice: "75.00",
        totalWeight: "4kg",
      },
    ],
  },
  {
    userId: "6",
    email: "some6@some.com",
    name: { first: "David", last: "Miller" },
    shoppingCarts: [
      {
        cartId: "cart6",
        products: ["4", "5"],
        cartName: "Furniture",
        totalPrice: "300.00",
        totalWeight: "50kg",
      },
    ],
  },
  {
    userId: "7",
    email: "some7@some.com",
    name: { first: "Eve", last: "Wilson" },
    shoppingCarts: [
      {
        cartId: "cart7",
        products: ["9", "10"],
        cartName: "Garden",
        totalPrice: "120.00",
        totalWeight: "20kg",
      },
    ],
  },
  {
    userId: "8",
    email: "some8@some.com",
    name: { first: "Frank", last: "Moore" },
    shoppingCarts: [
      {
        cartId: "cart8",
        products: ["7", "1"],
        cartName: "Sports",
        totalPrice: "180.00",
        totalWeight: "15kg",
      },
    ],
  },
  {
    userId: "9",
    email: "some9@some.com",
    name: { first: "Grace", last: "Taylor" },
    shoppingCarts: [
      {
        cartId: "cart9",
        products: ["8", "4"],
        cartName: "Beauty",
        totalPrice: "90.00",
        totalWeight: "1kg",
      },
    ],
  },
  {
    userId: "10",
    email: "some10@some.com",
    name: { first: "Hank", last: "Anderson" },
    shoppingCarts: [
      {
        cartId: "cart10",
        products: ["2", "3"],
        cartName: "Automotive",
        totalPrice: "250.00",
        totalWeight: "30kg",
      },
    ],
  },
];

export default users;
