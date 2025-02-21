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
  REFRESH_TOKEN: "/refresh-token",
  LOGOUT: "/logout",
};

export const SHOPPING_CART: Endpoint = {
  SHOPPING_CART: "/shopping-cart",
  SHOPPING_CART_USER: "/shopping-cart/:userid",
  SHOPPING_CART_BY_ID: "/shopping-cart/:cartid",
};

export const PRODUCT: Endpoint = {
  CART_PRODUCTS_BY_ID: "/cart-products/:cartid",
};
