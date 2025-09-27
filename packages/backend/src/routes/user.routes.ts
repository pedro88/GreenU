import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user/user.entity";
import { fetchAllUsersByGarden } from "../entity/user/actions/fetchAllByGarden";
import { editUser } from "../entity/user/actions/edit";

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

router.get("/:uuid/garden", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await fetchAllUsersByGarden(req, res);
  res.json(user);
});

router.patch("/:uuid", editUser);

// Ajouter un user
router.post("/", async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const newUser = userRepo.create(req.body);
  const savedUser = await userRepo.save(newUser);
  res.status(201).json(savedUser);
});

export default router;
