import { DataSource } from "typeorm";
import { fakerFR as faker } from "@faker-js/faker";
import { Garden } from "../entity/garden/garden.entity";

export async function seedGardens(dataSource: DataSource, count = 5) {
  const gardenRepo = dataSource.getRepository(Garden);

  const gardens: Garden[] = [];

  for (let i = 0; i < count; i++) {
    gardens.push(
      gardenRepo.create({
        name: faker.word.noun(),
        length: faker.number.int({ min: 10, max: 100 }),
        width: faker.number.int({ min: 10, max: 100 }),
        adress: faker.location.streetAddress(),
        type: faker.helpers.arrayElement(["Potager", "Ornemental", "Mixte"]),
        comment: faker.lorem.sentence(),
        baneer: faker.image.urlPicsumPhotos(),
      })
    );
  }

  await gardenRepo.save(gardens);
  console.log(`✅ ${count} gardens seeded`);
}
