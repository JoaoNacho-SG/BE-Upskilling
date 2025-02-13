import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartEntity } from "./ShoppingCartEntity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  userid!: number;

  @Column("varchar", { length: 100, nullable: false })
  first_name!: string;

  @Column("varchar", { length: 100, nullable: false })
  last_name!: string;

  @Column("varchar", { length: 100, nullable: false, unique: true })
  email!: string;

  @Column("varchar", { length: 100, nullable: false })
  password!: string;

  @OneToMany(() => CartEntity, (cart) => cart.user)
  cart!: CartEntity[];
}
