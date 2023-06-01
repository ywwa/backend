import prisma from "../prisma";

export default async function dbUserGet(username: string) {
  const requestedUser = prisma.user.findUnique({
    where: { username },
    include: {
      groups: true,
      memberOf: true,
      logs: true,
    },
  });

  return requestedUser;
}
