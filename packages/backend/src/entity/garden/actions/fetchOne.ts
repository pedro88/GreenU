import { Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { Garden } from "../garden.entity";
export const fetchOneGarden = async (req: Request, res: Response) => {
  try {
    const gardenRepository = AppDataSource.getRepository(Garden);
    const { uuid } = req.params;

    if (!uuid) {
      return res.status(400).json({ message: "UUID manquant dans la requête" });
    }

    const garden = await gardenRepository.findOne({
      where: { uuid: uuid },
      relations: ["beds", "lines"],
    });

    return garden;
  } catch (error) {
    console.error("Error fetching gardens:", error);
    throw error;
  }
};
