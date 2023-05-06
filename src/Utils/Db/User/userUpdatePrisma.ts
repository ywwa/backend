import prisma from "../prisma";

interface UpdateFields {
  username   ?: string,
  email      ?: string,
  firstName  ?: string,
  lastName   ?: string,
  password   ?: string,
  image      ?: string
};

export default async function userUpdatePrisma(
  username: string,
  info    : UpdateFields
) {
  if ( !username ) return null;

  const user = await prisma.user.update({
    where: { username },
    data : {
      ...info,
      updatedAt: new Date()
    }
  });

  return user;
};

