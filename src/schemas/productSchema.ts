export interface Product {
  id: string;
  name: string;
  price: number;
  categories: string[];
  description: string;
  related: string[];
}

export interface InsertProduct {
  name: string;
  price: number;
}

export interface InsertCartProduct {
  cartid: number;
  productid: number;
}
