import prisma from "../prisma";

interface RequiredFields {
  groupId: number;
  userId: number;
}

export default async function dbMemberGet(member: RequiredFields) {
  const requestedMember = await prisma.member.findFirst({
    where: {
      userId: member.userId,
      groupId: member.groupId,
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
          owner: { include: {
            groups: true,
            memberOf: true,
            logs: true
          }},
          members: true,
          userLogs: true
        },
      },
    },
  });

  return requestedMember;
}
