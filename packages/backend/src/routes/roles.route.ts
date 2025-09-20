import { Router } from "express";
import { createRole } from "../entity/roles/action/create";

const router = Router();

// POST /roles → création d’un rôle
router.post("/", createRole);

export default router;
