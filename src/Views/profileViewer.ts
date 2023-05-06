import { Group, User } from "@prisma/client";

type UserWithGroup = User & { groups: Group[] };

export default function profileViewer(
  user: UserWithGroup,
  currentUser?: User
) {
  const groups = currentUser
    ? Boolean(
      user.groups.find( (val) => val.ownerId == currentUser.id )
    )
    : false;
  const userView = {
    username : user.username,
    email    : user.email,
    firstName: user.firstName,
    lastName : user.lastName,
    image    : user.image,
    groups   : groups
  };

  return userView;
}

