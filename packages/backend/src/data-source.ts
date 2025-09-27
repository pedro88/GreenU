import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "1234",
  database: "greenU",
  synchronize: false, // ⚠️ seulement en dev !
  logging: true,

  //      EXEMPLE VIA HOMIE
  //      migrations: [`lib/api/migration/*.js`],
  //      entities: [`lib/api/entity/**/*.entity.js`],

  entities: [`src/entity/**/*.entity.ts`],
  dropSchema: false,
  migrations: [],
  subscribers: [],
});
