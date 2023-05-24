import { Group, Member, User } from "@prisma/client";

type VMember = Member & {
  user: User & { groups: Group[]; memberOf: Member[] };
  group: Group & { owner: User; members: Member[] };
};

export default function memberViewer(
  member: VMember,
) {
  const memberView = {
    group_id: member.group.id,
    group_name: member.group.name,

    user_id: member.user.id,
    user_username: member.user.username,
  };

  return memberView;
}
