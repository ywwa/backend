import prisma from "../prisma";

export default async function groupDelete(
  id: number
) {
  const group = await prisma.group.delete({
    where: { id },
    include: {
      owner: { include: { groups: true } }
    }
  });

  return group;
};

