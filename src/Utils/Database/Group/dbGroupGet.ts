import prisma from "../prisma";

export default async function dbGroupGet(
  id: number
) {
  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      owner: { include: { groups: true } },
      members: { include: { user: true, group: true } }
    }
  })

  return group;
}
