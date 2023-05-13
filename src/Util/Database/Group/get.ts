import prisma from "../prisma";

export default async function groupGet(
  id: number
) {
  if ( !id ) return null;

  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      owner: { include: { groups: true } },
      members: true
    }
  });

  return group;
}

