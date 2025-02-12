import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("shopping_cart")
export class CartEntity {
  @PrimaryGeneratedColumn("increment")
  cartid!: number;

  // @ManyToOne(() => UserEntity, (user) => user.userid, { onDelete: "CASCADE" })
  // @JoinColumn({ name: "userid" })
  // user!: UserEntity;

  @Column("int", { nullable: false })
  userid!: number;

  @Column("varchar", { length: 100, nullable: false })
  cartname!: string;
}
