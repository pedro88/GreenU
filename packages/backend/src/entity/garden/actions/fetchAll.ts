import { AppDataSource } from "../../../data-source";
import { Garden } from "../garden.entity";
export const fetchAllGardens = async (): Promise<Garden[]> => {
  try {
    const gardenRepository = AppDataSource.getRepository(Garden);

    const gardens = await gardenRepository.find({
      relations: ["beds", "lines"],
    });

    return gardens;
  } catch (error) {
    console.error("Error fetching gardens:", error);
    throw error;
  }
};
