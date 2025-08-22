import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type UpdateTravelData = Partial<{
  destination: string;
  startDate: string;
  endDate: string;
}>;

export const travelService = {
  getAll: async (ownerId: string) => {
    const travels = await prisma.travel.findMany({
      where: {
        ownerId: ownerId,
      },
      select: {
        id: true,
        destination: true,
        startDate: true,
        endDate: true,
      },
    });
    return travels;
  },

  getById: async (travelId: string) => {
    const travel = await prisma.travel.findUnique({
      where: {
        id: travelId,
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

  deleteTravel: async (travelId: string, userId: string) => {
    const travelToBeDeleted = await prisma.travel.findUnique({
      where: { id: travelId },
    });

    if (!travelToBeDeleted) {
      throw new Error("Ao deletar a viagem. Viagem não encontrada");
    }

    if (travelToBeDeleted.ownerId == userId) {
      await prisma.travel.delete({
        where: {
          id: travelId,
        },
      });
    } else {
      throw new Error(
        "Erro ao deletar a viagem. Sem permissão para deletar esta viagem!"
      );
    }
  },

  updateTravel: async (
    travelId: string,
    userId: string,
    data: UpdateTravelData
  ) => {
    const updateData: Partial<{
      destination: string;
      startDate: Date;
      endDate: Date;
    }> = {};

    if (data.destination !== undefined) {
      updateData.destination = data.destination;
    }

    if (data.startDate !== undefined) {
      updateData.startDate = new Date(data.startDate);
    }

    if (data.endDate !== undefined) {
      updateData.endDate = new Date(data.endDate);
    }

    const travelToBeUpdated = await prisma.travel.findUnique({
      where: { id: travelId },
    });

    if (!travelToBeUpdated) {
      throw new Error("Ao atualizar a viagem. Viagem não encontrada");
    }

    if (travelToBeUpdated.ownerId == userId) {
      await prisma.travel.update({
        where: { id: travelId },
        data: updateData,
      });
    } else {
      throw new Error(
        "Erro ao deletar a viagem. Sem permissão para deletar esta viagem!"
      );
    }
  },
};
