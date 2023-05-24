import prisma from "../prisma";

interface UpdateFields {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  password?: string;
}

export default async function dbUserUpdate(
  username: string,
  info: UpdateFields,
) {
  if (!username) return null;

  const user = await prisma.user.update({
    where: { username },
    data: {
      ...info,
      updatedAt: new Date(),
    },
  });

  return user;
}
