import { Group, Log, Member, User } from "@prisma/client";
import profileViewer from "./profileViewer";
import groupViewer from "./groupViewer";

type FullMember = Member & {
  user: User & {
    groups: Group[];
    memberOf: Member[];
    logs: Log[];
  };
  group: Group & {
    owner: User & {
      groups: Group[];
      memberOf: Member[];
      logs: Log[];
    };
    members: Member[];
    userLogs: Log[];
  };
};

export default function memberViewer(
  member: FullMember,
  showGroup = true,
) {
  const groupView = groupViewer(member.group);
  const userView = profileViewer(member.user);

  if (!showGroup) {
    const memberView = {
      user: userView,
    };

    return memberView;
  }

  const memberView = {
    group: groupView,
    user: userView,
  };

  return memberView;
}
