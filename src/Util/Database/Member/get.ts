import prisma from "../prisma";
import { User } from "@prisma/client";

export default async function memberGet(
  groupId: number
) {
  const members = prisma.member.findMany({
    where: { groupId },
    include: {
      user: {
        include: { member: true }
      }
    }
  });

  return members;
};
