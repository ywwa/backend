import { Group, User } from "@prisma/client";
import profileViewer from "./profile";

type FullGroup = Group & {
  owner: User & { groups: Group[] }
};

export default function viewer(
  group         : FullGroup,
  showUserGroups: Boolean = false
) {
  const ownerView = profileViewer(group.owner, showUserGroups);

  const view = {
    id         : group.id,
    name       : group.name,
    description: group.description,
    image      : group.image,
    owner      : ownerView,
  };

  return view;
}
