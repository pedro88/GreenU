import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { nullable } from "zod";
import Model from "../../model/Model";
import { removeListener } from "process";
import { Roles } from "../roles/roles.entity";
import { Users } from "../users/users.entity";

export interface IGarden {
  name: string;
  length: number;
  width: number;
  adress: string;
  type: string;
  comment: string | null;
  avatar: string | null;
}

@Entity()
export class Garden extends Model implements IGarden {
  @Column("varchar", { nullable: false })
  name!: string;

  @Column("number", { nullable: false })
  length!: number;

  @Column("number", { nullable: false })
  width!: number;

  @Column("varchar", { nullable: false })
  adress!: string;

  @Column("varchar", { nullable: false })
  type!: string;

  @Column("varchar", { nullable: true })
  comment!: string;

  @Column("varchar", { nullable: true })
  avatar!: string;

  //RELATIONS

  @ManyToMany(() => Users, (user) => user.roles)
  users!: Users[];
}
