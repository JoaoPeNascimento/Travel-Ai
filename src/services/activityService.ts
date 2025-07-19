import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const activityService = {
  getAll: async (travelId: string) => {
    const activities = prisma.activity.findMany({
      where: {
        travelId: travelId,
      },
    });
    return activities;
  },

  createActivity: async (data: {
    name: string;
    description: string;
    date: string;
    travelId: string;
  }) => {
    try {
      const activity = prisma.activity.create({
        data: {
          name: data.name,
          description: data.description,
          date: new Date(data.date),
          travelId: data.travelId,
        },
      });
      return activity;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Erro ao criar a atividade: " + error.message);
      }
      throw new Error("Erro ao criar a atividade");
    }
  },

  deleteActivityById: async (id: string) => {
    const activity = await prisma.activity.delete({ where: { id: id } });

    if (!activity) {
      throw new Error("Atividade não encontrada.");
    }

    return activity;
  },

  deleteAllActivitiesByTravelId: async (travelId: string) => {
    const activities = await prisma.activity.deleteMany({
      where: {
        travelId: travelId,
      },
    });

    if (!activities) {
      throw new Error("Atividade não encontrada.");
    }
  },
};
