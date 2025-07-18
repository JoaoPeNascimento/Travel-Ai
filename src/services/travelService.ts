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
    date: string;
    ownerId: string;
  }) => {
    try {
      const travel = await prisma.travel.create({
        data: {
          destination: data.destination,
          date: new Date(data.date),
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
