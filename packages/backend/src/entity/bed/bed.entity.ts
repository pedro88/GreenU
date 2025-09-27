import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { nullable } from "zod";
import Model from "../../model/Model";
import { removeListener } from "process";
import { Garden } from "../garden/garden.entity";
import { Line } from "../line/line.entity";

export interface IBed {
  name: string;
  length: number;
  width: number;
  comment: string | null;
  baneer: string | null;
}

@Entity()
export class Bed extends Model implements IBed {
  @Column("varchar", { nullable: false })
  name!: string;

  @Column("number", { nullable: false })
  length!: number;

  @Column("number", { nullable: false })
  width!: number;

  @Column("varchar", { nullable: true })
  comment!: string;

  @Column("varchar", { nullable: true })
  baneer!: string;

  //RELATIONS

  @ManyToOne(() => Garden, (garden) => garden.beds)
  garden!: Garden;

  @OneToMany(() => Line, (line) => line.bed)
  lines!: Line[];
}
