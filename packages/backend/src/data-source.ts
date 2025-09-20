import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/users/users.entity";
import { Roles } from "./entity/roles/roles.entity";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "1234",
  database: "greenU",
  synchronize: true, // ⚠️ seulement en dev !
  logging: true,

  //      EXEMPLE VIA HOMIE
  //      migrations: [`lib/api/migration/*.js`],
  //      entities: [`lib/api/entity/**/*.entity.js`],

  entities: [Users, Roles],
  // dropSchema: true,
  migrations: [],
  subscribers: [],
});
