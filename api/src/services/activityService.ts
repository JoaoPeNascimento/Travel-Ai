import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const activityService = {
  getAll: async (travelId: string) => {
    const activities = await prisma.activity.findMany({
      where: { travelId },
      select: {
        id: true,
        name: true,
        description: true,
        date: true,
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
      const travel = await prisma.travel.findUnique({
        where: { id: data.travelId },
      });

      if (!travel) {
        throw new Error("Viagem não encontrada.");
      }

      const activityDate = new Date(data.date);

      if (activityDate < travel.startDate || activityDate > travel.endDate) {
        throw new Error(
          "A data da atividade deve estar dentro do período da viagem."
        );
      }

      const activity = await prisma.activity.create({
        data: {
          name: data.name,
          description: data.description,
          date: activityDate,
          travelId: data.travelId,
        },
      });

      return activity;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Erro ao criar a atividade: " + error.message);
      }
      throw new Error("Erro ao criar a atividade.");
    }
  },

  updateActivity: async (
    id: string,
    data: {
      name?: string;
      description?: string;
      date?: string;
    }
  ) => {
    try {
      const activityExists = await prisma.activity.findUnique({
        where: { id },
      });
      if (!activityExists) {
        throw new Error("Atividade não encontrada.");
      }

      // Validação de data (se fornecida)
      let activityDate: Date | undefined;
      if (data.date) {
        activityDate = new Date(data.date);

        const travel = await prisma.travel.findUnique({
          where: { id: activityExists.travelId },
        });

        if (!travel) {
          throw new Error("Viagem associada não encontrada.");
        }

        if (activityDate < travel.startDate || activityDate > travel.endDate) {
          throw new Error(
            "A data da atividade deve estar dentro do período da viagem."
          );
        }
      }

      const updatedActivity = await prisma.activity.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          date: activityDate,
        },
      });

      return updatedActivity;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Erro ao atualizar a atividade: " + error.message);
      }
      throw new Error("Erro ao atualizar a atividade.");
    }
  },

  deleteActivityById: async (id: string) => {
    const activity = await prisma.activity.delete({ where: { id } });
    if (!activity) {
      throw new Error("Atividade não encontrada.");
    }
    return activity;
  },

  deleteAllActivitiesByTravelId: async (travelId: string) => {
    const activities = await prisma.activity.deleteMany({
      where: { travelId },
    });

    return activities;
  },
};
