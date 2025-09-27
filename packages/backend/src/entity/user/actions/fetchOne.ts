// src/controllers/userController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { User } from "../user.entity";

export const fetchOneUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const { uuid } = req.params; // on récupère l'uuid depuis l'URL

    if (!uuid) {
      return res.status(400).json({ message: "UUID manquant dans la requête" });
    }

    // Récupère l'utilisateur par id, sans le mot de passe
    const user = await userRepository.findOne({
      where: { uuid: uuid },
      select: [
        "uuid",
        "firstname",
        "lastname",
        "email",
        "gender",
        "comment",
        "avatar",
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération du user" });
  }
};
