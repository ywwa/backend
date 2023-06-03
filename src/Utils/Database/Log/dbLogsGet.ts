import prisma from "../prisma";

export default async function dbLogsGet(
  groupId: number,
) {
  const groupLogs = await prisma.log.findMany({
    where: { groupId },
    include: {
      user: {
        include: {
          groups: true,
          memberOf: true,
          logs: true,
        },
      },
      group: {
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
      },
    },
  });

  return groupLogs;
}
