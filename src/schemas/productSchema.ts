export interface Product {
  id: string;
  name: string;
  price: number;
  categories: string[];
  description: string;
  measures: {
    height: number;
    width: number;
  };
  weight: string;
  images: string[];
  related: string[];
  recommendations: string;
}
