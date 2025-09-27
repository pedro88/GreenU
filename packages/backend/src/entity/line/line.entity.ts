import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import Model from "../../model/Model";
import { Garden } from "../garden/garden.entity";
import { Bed } from "../bed/bed.entity";

export interface ILine {
  name: string;
  length: number;
  comment: string | null;
}

@Entity()
export class Line extends Model implements ILine {
  @Column("varchar", { nullable: false })
  name!: string;

  @Column("int", { nullable: false })
  length!: number;

  @Column("varchar", { nullable: true })
  comment!: string;

  //RELATIONS

  @ManyToOne(() => Garden, (garden) => garden.beds)
  garden!: Garden;

  @ManyToOne(() => Bed, (bed) => bed.lines)
  bed!: Bed;
}
