import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { User } from "../user.entity";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const { firstname, lastname, email, password, gender, comment, avatar } =
      req.body;

    // ⚠️ tu pourrais ajouter des validations ici (ex: vérifier si email existe déjà)

    const newUser = userRepository.create({
      firstname,
      lastname,
      email,
      password,
      gender,
      comment,
      avatar,
    });

    await userRepository.save(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du user" });
  }
};
