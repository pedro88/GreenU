import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user/user.entity";

const router = Router();

// Récupérer tous les users
router.get("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  res.json(users);
});

// Récupère un user
router.get("/:uuid", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ uuid: req.params.uuid });
  res.json(user);
});

// Ajouter un user
router.post("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const newUser = userRepo.create(req.body);
  const savedUser = await userRepo.save(newUser);
  res.status(201).json(savedUser);
});

export default router;
