import { Group, Log, Member, User } from "@prisma/client";

export default function profileViewer(
  user: User & {
    groups: Group[];
    logs: Log[];
    memberOf: Member[];
  },
) {
  const profileView = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
  };

  return profileView;
}
