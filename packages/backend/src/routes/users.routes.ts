import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/users/users.entity";

const router = Router();

// Récupérer tous les users
router.get("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(Users);
  const users = await userRepo.find();
  res.json(users);
});

// Récupère un user
router.get("/:uuid", async (req, res) => {
  const userRepo = AppDataSource.getRepository(Users);
  const user = await userRepo.findOneBy({ uuid: req.params.uuid });
  res.json(user);
});

// Ajouter un user
router.post("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(Users);
  const newUser = userRepo.create(req.body);
  const savedUser = await userRepo.save(newUser);
  res.status(201).json(savedUser);
});

export default router;
