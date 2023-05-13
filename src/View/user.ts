import { User } from "@prisma/client";

export default function viewer(
  user: User, token: string
) {
  const view = {
    user: {
      id        : user.id,
      username  : user.username,
      firstName : user.firstName,
      lastName  : user.lastName,
      role      : user.role,
      token     : token,
      createdAt : user.createdAt,
      updatedAt : user.updatedAt
    }
  };

  return view;
}
