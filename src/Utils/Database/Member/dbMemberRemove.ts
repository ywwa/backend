import prisma from "../prisma";

export default async function dbMemberRemove(
  id: number
) {
  const member = await prisma.member.delete({
    where: { id },
    include: {
      user: { include: { groups: true, memberOf: true } },
      group: { include: { owner: true, members: true } }
    }
  });

  return member;
}
