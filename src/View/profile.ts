import { User, Group } from "@prisma/client";

type UserWithGroup = User & { groups: Group[] };

export default function profileViewer(
  user: UserWithGroup,
) {
  const groups = user 
    ? Boolean(
      user.groups.find( (obj) => obj.ownerId == user.id )
    )
    : false;

  const view = {
    username   : user.username,
    email      : user.email,
    firstName  : user.firstName,
    lastName   : user.lastName,
    image      : user.image,
    role       : user.role,
    groups     : groups,
  };

  return view;
}

