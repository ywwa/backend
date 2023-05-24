import prisma from "../prisma";

interface UpdateFields {
  name?: string;
  description?: string;
}

export default async function dbGroupUpdate(
  id: number,
  info: UpdateFields,
) {
  const group = await prisma.group.update({
    where: { id },
    data: {
      ...info,
    },
    include: {
      owner: { include: { groups: true, memberOf: true } },
      members: { include: { user: true, group: true } },
    },
  });

  return group;
}
