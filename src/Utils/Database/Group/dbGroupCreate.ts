import prisma from "../prisma";

interface RequiredFields {
  name: string,
  description: string
};

export default async function dbGroupCreate(
  info: RequiredFields,
  ownerId: number
) {
  const group = await prisma.group.create({
    data: {
      ...info,
      ownerId
    },
    include: {
      owner: { include: { groups: true } },
      members: true
    }
  })

  return group;
}
