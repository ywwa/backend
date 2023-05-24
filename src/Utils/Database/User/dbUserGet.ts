import prisma from "../prisma";

export default async function dbUserGet(
  username: string,
) {
  if (!username) return null;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      groups: true,
      memberOf: true,
    },
  });

  return user;
}
