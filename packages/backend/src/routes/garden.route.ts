import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Garden } from "../entity/garden/garden.entity";
import { fetchAllGardens } from "../entity/garden/actions/fetchAll";
import { fetchOneGarden } from "../entity/garden/actions/fetchOne";

const router = Router();

// Récupérer tous les gardens
router.get("/", async (req, res) => {
  const gardenRepo = AppDataSource.getRepository(Garden);
  const gardens = await fetchAllGardens();
  res.json(gardens);
});

router.get("/:uuid", async (req, res) => {
  const gardenRepo = AppDataSource.getRepository(Garden);
  const user = await fetchOneGarden(req, res);
  res.json(user);
});

export default router;
