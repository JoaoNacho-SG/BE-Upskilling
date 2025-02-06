import { User } from "../schemas/userSchema";

const users: User[] = [
  {
    userid: "1",
    email: "some1@some.com",
    name: { first: "John", last: "Doe" },
    shoppingCarts: [
      {
        userid: "1",
        cartid: "cart1",
        products: ["3", "2", "4"],
        cartname: "Groceries",
      },
      {
        userid: "1",
        cartid: "cart99",
        products: ["1", "2", "3"],
        cartname: "Essentials",
      },
    ],
  },
  {
    userid: "2",
    email: "some2@some.com",
    name: { first: "Jane", last: "Smith" },
    shoppingCarts: [
      {
        userid: "2",
        cartid: "cart2",
        products: ["3"],
        cartname: "Electronics",
      },
    ],
  },
  {
    userid: "3",
    email: "some3@some.com",
    name: { first: "Alice", last: "Johnson" },
    shoppingCarts: [
      {
        userid: "3",
        cartid: "cart3",
        products: ["2"],
        cartname: "Clothing",
      },
    ],
  },
  {
    userid: "4",
    email: "some4@some.com",
    name: { first: "Bob", last: "Brown" },
    shoppingCarts: [
      {
        userid: "4",
        cartid: "cart4",
        products: ["1"],
        cartname: "Books",
      },
    ],
  },
  {
    userid: "5",
    email: "some5@some.com",
    name: { first: "Charlie", last: "Davis" },
    shoppingCarts: [
      {
        userid: "5",
        cartid: "cart5",
        products: ["4"],
        cartname: "Toys",
      },
    ],
  },
];

export default users;
