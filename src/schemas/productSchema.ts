export interface Product {
  productid: string;
  name: string;
  price: number;
}

export interface InsertProduct {
  name: string;
  price: number;
}

export interface InsertCartProduct {
  cartid: number;
  productid: number;
}
