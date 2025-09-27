import { Entity, Column, OneToMany, ManyToMany } from "typeorm";
import { nullable } from "zod";
import Model from "../../model/Model";
import { removeListener } from "process";
import { User } from "../user/user.entity";

export interface IRole {
  name: string;
}

@Entity()
export class Role extends Model implements IRole {
  @Column("varchar", { nullable: false })
  name!: string;

  //RELATIONS

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[];
}
