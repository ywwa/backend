import prisma from "../prisma";

interface RequiredFields {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export default async function dbUserCreate(data: RequiredFields) {
  const newUser = await prisma.user.create({
    data: { ...data },
  });
  return newUser;
}
