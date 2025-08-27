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

    const token = generateToken(user.id);
    return { token, userId: user.id };
  },

  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado.");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Senha incorreta.");

    const token = generateToken(user.id);
    return { token, userId: user.id };
  },

  getUser: async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("Usuário não encontrado. Faça login novamente.");
    }

    const userData = {
      name: user.name,
      email: user.email,
    };

    return { userData };
  },

  checkEmail: async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    return !!user;
  },
};
