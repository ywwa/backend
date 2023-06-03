import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";
import { dbMemberGet } from "../../../Utils/Database/Member";
import { dbLogsGetMember } from "../../../Utils/Database/Log";
import { logViewer } from "../../../View";

export default async function fnLogsGetMember(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.gid);
  const memberId = parseInt(req.params.mid);

  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.sendStatus(403);
    }
    const requestedGroup = await dbGroupGet(groupId);
    if (!requestedGroup) {
      return res.sendStatus(404);
    }

    const requestedMember = await dbMemberGet({
      groupId: groupId,
      userId: memberId,
    });
    if (!requestedMember) {
      return res.status(404).json({
        message: "Member not found"
      })
    }

    const memberLogs = await dbLogsGetMember(groupId, memberId);
    const logsView = memberLogs.map((log) => logViewer(log, false, false));

    return res.json({ logs: logsView });
  } catch (error) {
    return next(error);
  }
}
