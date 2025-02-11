export interface ShoppingCart {
  cartid?: number;
  userid: number;
  cartname: string;
}

export interface User {
  userid?: number;
  email: string;
  first_name: string;
  last_name: string;
}
