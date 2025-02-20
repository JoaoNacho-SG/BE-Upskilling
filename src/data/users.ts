import { InsertUser } from "../schemas/userSchema";

const users: InsertUser[] = [
  {
    email: "some1@some.com",
    first_name: "John",
    last_name: "Doe",
    password: "password",
  },
  {
    email: "some2@some.com",
    first_name: "Jane",
    last_name: "Smith",
    password: "password",
  },
  {
    email: "some3@some.com",
    first_name: "Alice",
    last_name: "Johnson",
    password: "password",
  },
];

export default users;
