import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { Roles } from "../roles.entity";

export const createRole = async (req: Request, res: Response) => {
  try {
    const roleRepo = AppDataSource.getRepository(Roles);
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ message: "Le nom du rôle est requis" });

    // Vérifie si le rôle existe déjà
    const existing = await roleRepo.findOne({ where: { name } });
    if (existing)
      return res.status(409).json({ message: "Rôle déjà existant" });

    const newRole = roleRepo.create({ name });
    await roleRepo.save(newRole);

    res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du rôle" });
  }
};
