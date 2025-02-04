interface ShoppingCart {
  cartId: string;
  products: string[];
  cartName: string;
  totalPrice: string;
}

export interface User {
  userId: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  shoppingCarts?: ShoppingCart[];
}
