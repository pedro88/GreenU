// src/seeds/seed.ts
import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source"; // ton fichier de config TypeORM

import { seedRoles } from "./role.seed";
import { seedGardens } from "./garden.seed";
import { seedBeds } from "./bed.seed";
import { seedLines } from "./line.seed";
import { seedUsers } from "./user.seed";
import { Bed } from "../entity/bed/bed.entity";
import { Garden } from "../entity/garden/garden.entity";
import { Line } from "../entity/line/line.entity";
import { Role } from "../entity/role/role.entity";
import { User } from "../entity/user/user.entity";

async function runSeeds() {
  const dataSource: DataSource = await AppDataSource.initialize();
  await dataSource.synchronize(true);

  try {
    // console.log("🧹 Clearing tables...");

    // // ⚠️ L'ordre est important à cause des relations FK
    // await dataSource.getRepository(User).clear();
    // await dataSource.getRepository(Role).clear();
    // await dataSource.getRepository(Line).clear();
    // await dataSource.getRepository(Bed).clear();
    // await dataSource.getRepository(Garden).clear();

    console.log("✅ Tables cleared");

    // Seed dans un ordre logique
    await seedRoles(dataSource);
    await seedGardens(dataSource);
    await seedBeds(dataSource);
    await seedLines(dataSource);
    await seedUsers(dataSource);

    console.log("🌱 Database successfully seeded!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await dataSource.destroy();
  }
}

runSeeds();
