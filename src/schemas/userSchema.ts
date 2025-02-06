export interface ShoppingCart {
  cartid: string;
  userid: string;
  products: string[];
  cartname: string;
}

export interface User {
  userid: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  shoppingCarts?: ShoppingCart[];
}
