import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";
import { dbLogsGet } from "../../../Utils/Database/Log";
import { logViewer } from "../../../View";

export default async function fnLogsGet(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.gid);

  try {
    // INFO: Check if user is authenticated
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.status(403).json({
        message: "User not found or unauthenticated",
      });
    }

    // INFO: Check if requested group exists
    const requestedGroup = await dbGroupGet(groupId);
    if (!requestedGroup) {
      return res.status(404).json({
        message: "Group Not Found",
      });
    }

    const groupLogs = await dbLogsGet(groupId);
    const logsView = groupLogs.map((log) => logViewer(log));

    return res.json({ logs: logsView });
  } catch (error) {
    return next(error);
  }
}
