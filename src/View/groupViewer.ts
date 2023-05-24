import { Group, Member, User } from "@prisma/client";
import profileViewer from "./profileViewer";

type FullGroup = Group & {
  owner: User & { groups: Group[] },
  members: Member[]
}

export default function groupViewer(
  group     : FullGroup,
  showGroups: Boolean = false
) {
  const ownerView = profileViewer(group.owner, showGroups);
  
  const groupView = {
    name       : group.name,
    description: group.description,
    owner      : ownerView,
    members    : group.members
  };

  return groupView;
}
