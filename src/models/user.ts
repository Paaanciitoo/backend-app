import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface User {
  id: number;
  email: string;
  password: string;
  twoFactorSecret?: string | null;
  twoFactorEnabled: boolean;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
      password,
      twoFactorEnabled: false,
    },
  });
};

export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => {
  if (!id) {
    throw new Error("El ID del usuario es requerido");
  }

  return prisma.user.update({
    where: { id },
    data,
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};
