import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { User } from "../user.entity";

export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // récupère tous les users
    const users = await userRepository.find({
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

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des users" });
  }
};
