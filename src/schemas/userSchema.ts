import { UserEntity } from "../database/entities/UserEntity";

export type ShoppingCart = {
  cartid: number;
  user: UserEntity;
  userid: number;
  cartname: string;
};

export type User = {
  userid: number;
  email: string;
  first_name: string;
  last_name: string;
};

export type InsertUser = {
  email: string;
  first_name: string;
  last_name: string;
};
