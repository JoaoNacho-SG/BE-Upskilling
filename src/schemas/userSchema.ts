import { CartEntity } from "../database/entities/ShoppingCartEntity";
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
  password?: string;
  first_name: string;
  last_name: string;
  cart?: CartEntity[];
};

export type InsertUser = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};
