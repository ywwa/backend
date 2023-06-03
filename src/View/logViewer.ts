import { Group, Log, Member, User } from "@prisma/client";
import profileViewer from "./profileViewer";
import groupViewer from "./groupViewer";

type FullLog = Log & {
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

export default function logViewer(
  log: FullLog,
  showGroup = false,
  showUser = true,
) {
  const profileView = profileViewer(log.user);
  const groupView = groupViewer(log.group);

  if (!showUser && !showGroup) {
    const logView = {
      id: log.Id,
      platform: log.platform,
      processName: log.processName,
      windowName: log.windowName,
      createdAt: log.createdAt,
    };

    return logView;
  }

  if (!showGroup) {
    const logView = {
      id: log.Id,
      user: profileView,
      platform: log.platform,
      processName: log.processName,
      windowName: log.windowName,
      createdAt: log.createdAt,
    };

    return logView;
  }

  const logView = {
    id: log.Id,
    user: profileView,
    group: groupView,
    platform: log.platform,
    processName: log.processName,
    windowName: log.windowName,
    createdAt: log.createdAt,
  };

  return logView;
}
