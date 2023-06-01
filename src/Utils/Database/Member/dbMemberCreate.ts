import prisma from "../prisma";

interface NewMember {
  groupId: number;
  userId: number;
}

export default async function dbMemberCreate(newMemberData: NewMember) {
  const newMember = await prisma.member.create({
    data: { ...newMemberData },
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

  return newMember;
}
