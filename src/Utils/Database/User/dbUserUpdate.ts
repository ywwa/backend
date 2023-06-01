import prisma from "../prisma";

interface UpdateFields {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  password: string;
}

export default async function dbUserUpdate(
  username: string,
  data: UpdateFields,
) {
  const updatedUser = await prisma.user.update({
    where: { username },
    data: {
      ...data,
    },
  });

  return updatedUser;
}
