import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { nullable } from "zod";
import Model from "../../model/Model";
import { removeListener } from "process";
import { User } from "../user/user.entity";
import { Bed } from "../bed/bed.entity";
import { Line } from "../line/line.entity";

export interface IGarden {
  name: string;
  length: number;
  width: number;
  adress: string;
  type: string;
  comment: string | null;
  baneer: string | null;
}

@Entity()
export class Garden extends Model implements IGarden {
  @Column("varchar", { nullable: false })
  name!: string;

  @Column("int", { nullable: false })
  length!: number;

  @Column("int", { nullable: false })
  width!: number;

  @Column("varchar", { nullable: false })
  adress!: string;

  @Column("varchar", { nullable: false })
  type!: string;

  @Column("varchar", { nullable: true })
  comment!: string;

  @Column("varchar", { nullable: true })
  baneer!: string;

  //RELATIONS

  @ManyToMany(() => User, (user) => user.garden)
  users!: User[];

  @OneToMany(() => Bed, (beds) => beds.garden)
  beds!: Bed[];

  @OneToMany(() => Line, (lines) => lines.garden)
  lines!: Line[];
}
