import prisma from "../prisma";

export default async function dbLogsGetMember(
  groupId: number,
  userId: number,
) {
  const memberLogs = await prisma.log.findMany({
    where: { groupId, userId },
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

  return memberLogs;
}
