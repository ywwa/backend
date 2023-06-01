import prisma from "../prisma";

export default async function dbMemberDelete(memberId: number) {
  const deletedMember = await prisma.member.delete({
    where: { id: memberId },
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
    }
  });

  return deletedMember;
}
