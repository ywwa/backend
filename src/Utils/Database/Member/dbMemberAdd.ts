import prisma from "../prisma";

export default async function dbMemberAdd(
  groupId: number,
  userId: number,
) {
  const member = await prisma.member.create({
    data: {
      userId,
      groupId,
    },
    include: {
      user: { include: { groups: true, memberOf: true } },
      group: { include: { owner: true, members: true } },
    },
  });

  return member;
}
