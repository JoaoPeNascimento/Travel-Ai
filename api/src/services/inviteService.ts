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

  getInvitesByTravel: async (travelId: string) => {
    return await prisma.invite.findMany({
      where: { travelId },
      include: {
        travel: true, // se quiser os dados da viagem
      },
    });
  },

  getInvitesByUser: async (userId: string) => {
    return await prisma.invite.findMany({
      where: {
        userId,
      },
      include: {
        travel: true,
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

  deleteInviteById: async (inviteId: string) => {
    const inviteToBeDeleted = await prisma.invite.findUnique({
      where: {
        id: inviteId,
      },
    });

    if (!inviteToBeDeleted) {
      throw new Error("Convite não encontrado!");
    }

    await prisma.invite.delete({
      where: {
        id: inviteId,
      },
    });
  },
};
