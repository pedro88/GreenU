// src/seeds/line.seed.ts
import { DataSource } from "typeorm";
import { fakerFR as faker } from "@faker-js/faker";
import { Bed } from "../entity/bed/bed.entity";
import { Line } from "../entity/line/line.entity";

export async function seedLines(dataSource: DataSource, count = 20) {
  const lineRepo = dataSource.getRepository(Line);
  const bedRepo = dataSource.getRepository(Bed);

  const beds = await bedRepo.find({
    relations: ["garden"], // ⚠️ important pour récupérer le garden lié au bed
  });

  const lines: Line[] = [];

  for (let i = 0; i < count; i++) {
    const bed = faker.helpers.arrayElement(beds);

    lines.push(
      lineRepo.create({
        name: faker.word.noun(),
        length: faker.number.int({ min: 1, max: 50 }),
        comment: faker.lorem.sentence(),
        bed: bed,
        garden: bed.garden, // 👈 cohérence assurée
      })
    );
  }

  await lineRepo.save(lines);
  console.log(`✅ ${count} lines seeded (coherent with beds/gardens)`);
}
