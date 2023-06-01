import { Group, Log, Member, User } from "@prisma/client";
import profileViewer from "./profileViewer";

type FullGroup = Group & {
  owner: User & { groups: Group[]; memberOf: Member[]; logs: Log[] };
  members: Member[];
  userLogs: Log[];
};

export default function groupViewer(
  group: FullGroup,
) {
  const ownerView = profileViewer(group.owner);

  const groupView = {
    id: group.id,
    name: group.name,
    description: group.description,
    owner: ownerView,
  };

  return groupView;
}
