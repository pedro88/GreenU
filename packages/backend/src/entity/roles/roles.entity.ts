import { Entity, Column, OneToMany, ManyToMany } from "typeorm";
import { nullable } from "zod";
import Model from "../../model/Model";
import { removeListener } from "process";
import { Users } from "../users/users.entity";

export interface IRoles {
  name: string;
}

@Entity()
export class Roles extends Model implements IRoles {
  @Column("varchar", { nullable: false })
  name!: string;

  //RELATIONS

  @ManyToMany(() => Users, (user) => user.roles)
  users!: Users[];
}
