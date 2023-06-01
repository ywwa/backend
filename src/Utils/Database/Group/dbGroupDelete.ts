import prisma from "../prisma";

export default async function dbGroupDelete(id: number) {
  const deletedGroup = await prisma.group.delete({
    where: { id },
    include: {
      owner: { include: { groups: true, memberOf: true, logs: true } },
      members: true,
      userLogs: true,
    },
  });

  return deletedGroup;
}
