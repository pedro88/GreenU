import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { User } from "../user.entity";

export const editUser = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const { firstname, lastname, email, gender, comment, avatar } = req.body;

    if (!uuid) {
      return res.status(400).json({ message: "UUID manquant dans la requête" });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { uuid } });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour des champs
    if (firstname !== undefined) user.firstname = firstname;
    if (lastname !== undefined) user.lastname = lastname;
    if (email !== undefined) user.email = email;
    if (gender !== undefined) user.gender = gender;
    if (comment !== undefined) user.comment = comment;
    if (avatar !== undefined) user.avatar = avatar;

    // Ne jamais toucher deletedAt ici
    // user.deletedAt reste intact

    await userRepository.save(user);

    return res
      .status(200)
      .json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};
