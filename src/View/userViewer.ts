import { User } from "@prisma/client";

export default function userViewer(
  user: User,
  token: string,
) {
  const userView = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: token,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };

  return userView;
}
