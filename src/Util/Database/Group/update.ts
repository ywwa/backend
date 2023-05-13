import prisma from "../prisma";

interface RequiredFields {
  name        ?: string;
  description ?: string;
  image       ?: string;
};

export default async function groupUpdate(
  id  : number,
  info: RequiredFields
) {
  const group = await prisma.group.update({
    where: { id },
    data: {
      ...info
    },
    include: {
      owner: { include: { groups: true } }
    }
  });

  return group;
};

