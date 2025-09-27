import { Entity, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { nullable } from "zod";
import Model from "../../model/Model";
import { removeListener } from "process";
import { Role } from "../role/role.entity";
import { Garden } from "../garden/garden.entity";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: string | null;
  comment: string | null;
  avatar: string | null;
}

@Entity()
export class User extends Model implements IUser {
  @Column("varchar", { nullable: false })
  firstname!: string;

  @Column("varchar", { nullable: false })
  lastname!: string;

  @Column("varchar", { nullable: false })
  email!: string;

  @Column("varchar", { nullable: false, select: false })
  password!: string;

  @Column("varchar", { nullable: true })
  gender!: string;

  @Column("varchar", { nullable: true })
  comment!: string;

  @Column("varchar", { nullable: true })
  avatar!: string;

  //RELATIONS

  @ManyToMany(() => Role, (roles) => roles.users, { eager: true }) // eager: true pour charger automatiquement
  @JoinTable() // nécessaire sur un côté de la relation pour créer la table de jointure
  roles!: Role[];

  @ManyToMany(() => Garden, (garden) => garden.users, { eager: true }) // eager: true pour charger automatiquement
  @JoinTable() // nécessaire sur un côté de la relation pour créer la table de jointure
  garden!: Garden[];
}
