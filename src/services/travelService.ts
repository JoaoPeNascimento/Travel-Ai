import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const travelService = {
  getAll: async () => {
    const travels = await prisma.travel.findMany();
    return travels;
  },

  getById: async (id: string) => {
    const travel = await prisma.travel.findUnique({
      where: {
        id: id,
      },
    });
    if (!travel) {
      throw new Error("Viagem não encontrada");
    }
    return travel;
  },

  createTravel: async (data: {
    destination: string;
    startDate: string;
    endDate: string;
    ownerId: string;
  }) => {
    try {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (startDate >= endDate) {
        throw new Error(
          "A data de início deve ser anterior à data de término."
        );
      }

      if (startDate < new Date()) {
        throw new Error("A data de início não pode ser anterior à data atual.");
      }

      if (endDate < new Date()) {
        throw new Error(
          "A data de término não pode ser anterior à data atual."
        );
      }

      const travel = await prisma.travel.create({
        data: {
          destination: data.destination,
          startDate: startDate,
          endDate: endDate,
          ownerId: data.ownerId,
        },
      });

      return travel;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Erro ao criar a viagem: " + error.message);
      }
      throw new Error("Erro ao criar a viagem");
    }
  },

  deleteTravel: async (id: string) => {
    const travel = await prisma.travel.delete({
      where: {
        id: id,
      },
    });
    return travel;
  },
};
