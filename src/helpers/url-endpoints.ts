interface Endpoint {
  [key: string]: string;
}

export const USER: Endpoint = {
  USERS: "/users",
  USER_BY_ID: "/users/:userid",
};

export const PRODUCTS: Endpoint = {
  LIST: "/list",
  ADD: "/add",
};
