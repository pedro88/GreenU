import { DataSource } from "typeorm";
import { Role } from "../entity/role/role.entity";

export async function seedRoles(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(Role);

  const roles = ["Admin", "Manager", "User"].map((name) =>
    roleRepo.create({ name })
  );

  await roleRepo.save(roles);
  console.log("✅ Roles seeded");
}
