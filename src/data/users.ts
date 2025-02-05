import { User } from "../schemas/userSchema";

const users: User[] = [
  {
    userid: "1",
    email: "some1@some.com",
    name: { first: "John", last: "Doe" },
    shoppingCarts: [
      {
        cartId: "cart1",
        products: ["3", "2", "4"],
        cartName: "Groceries",
        totalPrice: "100",
      },
      {
        cartId: "cart99",
        products: ["1", "2", "3"],
        cartName: "Essentials",
        totalPrice: "199",
      },
    ],
  },
  {
    userid: "2",
    email: "some2@some.com",
    name: { first: "Jane", last: "Smith" },
    shoppingCarts: [
      {
        cartId: "cart2",
        products: ["3"],
        cartName: "Electronics",
        totalPrice: "200",
      },
    ],
  },
  {
    userid: "3",
    email: "some3@some.com",
    name: { first: "Alice", last: "Johnson" },
    shoppingCarts: [
      {
        cartId: "cart3",
        products: ["2"],
        cartName: "Clothing",
        totalPrice: "159",
      },
    ],
  },
  {
    userid: "4",
    email: "some4@some.com",
    name: { first: "Bob", last: "Brown" },
    shoppingCarts: [
      {
        cartId: "cart4",
        products: ["1"],
        cartName: "Books",
        totalPrice: "50",
      },
    ],
  },
  {
    userid: "5",
    email: "some5@some.com",
    name: { first: "Charlie", last: "Davis" },
    shoppingCarts: [
      {
        cartId: "cart5",
        products: ["4"],
        cartName: "Toys",
        totalPrice: "75",
      },
    ],
  },
];

export default users;
