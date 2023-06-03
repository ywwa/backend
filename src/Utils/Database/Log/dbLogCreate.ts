import prisma from "../prisma";

interface LogData {
  platform: string;
  processName: string;
  windowName: string;
}

export default async function dbLogCreate(
  userId: number,
  groupId: number,
  logData: LogData,
) {
  const newLogRecord = await prisma.log.create({
    data: {
      userId,
      groupId,
      ...logData,
      createdAt: new Date(),
    },
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

  return newLogRecord;
}
