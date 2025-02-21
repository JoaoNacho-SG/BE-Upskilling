import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CartEntity } from "./ShoppingCartEntity";
import { ProductEntity } from "./ProductEntity";

@Entity("cart_products")
export class CartProductEntity {
  @PrimaryColumn({ type: "int" })
  cartid!: number;

  @PrimaryColumn({ type: "int" })
  productid!: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cartid, { onDelete: "CASCADE" })
  @JoinColumn({ name: "cartid" })
  cart!: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.productid, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productid" })
  product!: ProductEntity;
}
