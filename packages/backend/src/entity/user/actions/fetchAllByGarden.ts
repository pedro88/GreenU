// src/controllers/userController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { User } from "../user.entity";

export const fetchAllUsersByGarden = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({ message: "UUID manquant dans la requête" });
    }

    const users = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.garden", "garden")
      .where("garden.uuid = :uuid", { uuid })
      .select([
        "user.uuid",
        "user.firstname",
        "user.lastname",
        "user.email",
        "user.gender",
        "user.comment",
        "user.avatar",
      ])
      .getMany();

    if (!users) {
      return res
        .status(404)
        .json({ message: "pas d'utilisateur lié à ce jardin" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des users" });
  }
};
