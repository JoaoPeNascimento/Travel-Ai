import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const inviteService = {
  createInvite: async (
    userId: string,
    travelId: string,
    recieverEmail: string
  ) => {
    return await prisma.invite.create({
      data: {
        userId,
        travelId,
        recieverEmail,
      },
    });
  },

  getInvites: async (travelId: string) => {
    return await prisma.invite.findMany({
      where: {
        travelId: travelId,
      },
    });
  },

  deleteInvitesByTravelId: async (travelId: string) => {
    const invites = await prisma.invite.deleteMany({
      where: {
        travelId: travelId,
      },
    });

    if (!invites) {
      throw new Error("Não há convites para deletar.");
    }
  },
};
