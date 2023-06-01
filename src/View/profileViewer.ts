import { Group, Log, Member, User } from "@prisma/client";

export default function profileViewer(
  user: User & { groups: Group[]; logs: Log[]; memberOf: Member[] },
  // showGroups?: Boolean,
  // showLogs?: Boolean,
) {
  // var groups;
  // var logs;
  //
  // if (!showGroups) {
  //   groups = user
  //     ? Boolean(
  //       user.groups.find(
  //         (obj) => obj.ownerId == user.id,
  //       ),
  //     )
  //     : false;
  // } else {
  //   groups = user.groups;
  // }
  //
  // if (!showLogs) {
  //   logs = user
  //     ? Boolean(
  //       user.logs.find(
  //         (obj) => obj.userId == user.id,
  //       ),
  //     )
  //     : false;
  // }

  const profileView = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    // groups: groups,
    // logs: logs
  };

  return profileView;
}
