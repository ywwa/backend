import { User, Group } from "@prisma/client";

type UserWithGroup = User & { groups: Group[] };

export default function profileViewer(
  user       : UserWithGroup,
  showGroups?: Boolean
) {

  var groups;

  if ( !showGroups ) {
    groups = user
      ? Boolean(
        user.groups.find(
          (obj) => obj.ownerId == user.id
        )
      )
      : false;
  } else {
    groups = user.groups;
  }

  const view = {
    username   : user.username,
    email      : user.email,
    firstName  : user.firstName,
    lastName   : user.lastName,
    image      : user.image,
    groups     : groups
  };

  return view;
}

