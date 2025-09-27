import { DataSource } from "typeorm";
import { fakerFR as faker } from "@faker-js/faker";
import { Bed } from "../entity/bed/bed.entity";
import { Garden } from "../entity/garden/garden.entity";

export async function seedBeds(dataSource: DataSource, count = 10) {
  const bedRepo = dataSource.getRepository(Bed);
  const gardenRepo = dataSource.getRepository(Garden);

  const gardens = await gardenRepo.find();
  const beds: Bed[] = [];

  for (let i = 0; i < count; i++) {
    beds.push(
      bedRepo.create({
        name: faker.word.noun(),
        length: faker.number.int({ min: 1, max: 10 }),
        width: faker.number.int({ min: 1, max: 10 }),
        comment: faker.lorem.sentence(),
        baneer: faker.image.url(),
        garden: faker.helpers.arrayElement(gardens),
      })
    );
  }

  await bedRepo.save(beds);
  console.log(`✅ ${count} beds seeded`);
}
