import prisma from "../prisma";

export default async function memberCreate(
  groupId: number,
  userId : number
) {
  const member = await prisma.member.create({
    data: {
      groupId: groupId,
      userId: userId
    },
    include: {
      group: true,
      user: true
    }
  });

  return member;
};

