import prisma from "../prisma";

interface RequiredFields {
  name: string;
  description: string;
}

export default async function dbGroupCreate(
  newGroupData: RequiredFields,
  ownerId: number,
) {
  const newGroup = await prisma.group.create({
    data: {
      ...newGroupData,
      ownerId,
    },
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

  return newGroup;
}
