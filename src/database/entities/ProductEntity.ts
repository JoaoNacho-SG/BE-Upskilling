import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn("increment")
  productid!: number;

  @Column("varchar", { length: 100, nullable: false })
  name!: string;

  @Column("int", { nullable: false })
  price!: number;
}
