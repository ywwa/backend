import prisma from "../prisma";

export default async function dbGroupDelete(
  id: number
) {
  const group = await prisma.group.delete({
    where: { id },
    include: {
      owner: { include: { groups: true } },
      members: { include: { user: true, group: true} }
    }
  });

  return group;
}
