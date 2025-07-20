import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const travelService = {
  getAll: async (ownerId: string) => {
    const travels = await prisma.travel.findMany({
      where: {
        ownerId: ownerId,
      },
    });
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
      const travel = await prisma.travel.create({
        data: {
          destination: data.destination,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
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

  updateTravel: async (
    id: string,
    data: {
      destination: string;
      startDate: string;
      endDate: string;
    }
  ) => {
    const travel = await prisma.travel.update({
      where: {
        id: id,
      },
      data: {
        destination: data.destination,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
    return travel;
  },
};
