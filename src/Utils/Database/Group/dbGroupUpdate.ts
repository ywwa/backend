import prisma from "../prisma";

interface UpdateFields {
  name?: string;
  description?: string;
}

export default async function dbGroupUpdate(
  id: number,
  newGroupInfo: UpdateFields,
) {
  const updatedGroup = await prisma.group.update({
    where: { id },
    data: { ...newGroupInfo },
    include: {
      owner: { include: { groups: true, memberOf: true, logs: true } },
      members: true,
      userLogs: true,
    },
  });

  return updatedGroup;
}
