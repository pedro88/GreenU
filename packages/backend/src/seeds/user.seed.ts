import { DataSource } from "typeorm";
import { fakerFR as faker } from "@faker-js/faker";
import { Garden } from "../entity/garden/garden.entity";
import { Role } from "../entity/role/role.entity";
import { User } from "../entity/user/user.entity";

export async function seedUsers(dataSource: DataSource, count = 10) {
  const userRepo = dataSource.getRepository(User);
  const roleRepo = dataSource.getRepository(Role);
  const gardenRepo = dataSource.getRepository(Garden);

  const roles = await roleRepo.find();
  const gardens = await gardenRepo.find();

  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    const user = userRepo.create({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(), // à hasher en prod !
      gender: faker.person.sex(),
      comment: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
      roles: faker.helpers.arrayElements(roles, 1),
      garden: faker.helpers.arrayElements(gardens, 2),
    });

    users.push(user);
  }

  await userRepo.save(users);
  console.log(`✅ ${count} users seeded`);
}
