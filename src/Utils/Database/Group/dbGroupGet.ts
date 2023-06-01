import prisma from "../prisma";

export default async function dbGroupGet(
  id: number,
) {
  const requestedGroup = await prisma.group.findUnique({
    where: { id },
    include: {
      owner: {
        include: {
          groups: true,
          memberOf: true,
          logs: true,
        },
      },
      members: true,
      userLogs: true,
    },
  });

  return requestedGroup;
}
