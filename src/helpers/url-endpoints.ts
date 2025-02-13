interface Endpoint {
  [key: string]: string;
}

export const USER: Endpoint = {
  USERS: "/users",
  USER_BY_ID: "/users/:userid",
  USER_BY_EMAIL: "/users/email/:email",
};

export const AUTH: Endpoint = {
  LOGIN: "/login",
};

export const SHOPPING_CART: Endpoint = {
  SHOPPING_CART: "/shopping-cart",
  SHOPPING_CART_USER: "/shopping-cart/:userid",
  SHOPPING_CART_BY_ID: "/shopping-cart/:cartid",
  SHOPPING_CART_PRODUCTS: "/shopping-cart/:cartid/products",
};

export const PRODUCTS: Endpoint = {
  LIST: "/list",
  ADD: "/add",
};
