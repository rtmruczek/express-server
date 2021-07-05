import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(user: Prisma.UserCreateInput) {
  return await prisma.user.create({
    data: user,
  });
}

export async function getUniqueUserBy(field: string, value: string) {
  const user = await prisma.user.findUnique({
    where: {
      [field]: value,
    },
  });
  if (!user) {
    throw Error('Not Found');
  }
  return user;
}
