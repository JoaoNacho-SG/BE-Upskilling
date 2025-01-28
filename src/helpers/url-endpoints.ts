interface Endpoint {
  [key: string]: string;
}

export const USER: Endpoint = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  SIGNUP: "/signup",
};

export const PRODUCTS: Endpoint = {
  LIST: "/list",
};
