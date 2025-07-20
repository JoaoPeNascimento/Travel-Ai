import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

const prisma = new PrismaClient();

export const authService = {
  register: async (name: string, email: string, password: string) => {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) throw new Error("E-mail já cadastrado.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return generateToken(user.id);
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado.");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Senha incorreta.");

    return generateToken(user.id);
  },
};
