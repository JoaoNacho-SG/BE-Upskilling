import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
