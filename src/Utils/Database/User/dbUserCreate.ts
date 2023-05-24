import prisma from "../prisma";

interface RequiredFields {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default async function dbUserCreate(
  info: RequiredFields,
) {
  const user = await prisma.user.create({
    data: { ...info },
  });

  return user;
}
