import prisma from "../prisma";

export default async function dbMembersGet(
  groupId: number,
) {
  const members = await prisma.member.findMany({
    where: { groupId },
    include: {
      user: { include: { groups: true, memberOf: true } },
      group: { include: { owner: true, members: true } },
    },
  });

  return members;
}
