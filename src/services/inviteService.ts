import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const inviteService = {
  createInvite: async (travelId: string, recieverEmail: string) => {
    const userReciever = await prisma.user.findUnique({
      where: {
        email: recieverEmail,
      },
    });

    return await prisma.invite.create({
      data: {
        travel: { connect: { id: travelId } },
        recieverEmail,
        ...(userReciever && {
          user: { connect: { id: userReciever.id } },
        }),
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
