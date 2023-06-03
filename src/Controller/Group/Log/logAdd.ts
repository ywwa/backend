import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";
import { dbMemberGet } from "../../../Utils/Database/Member";
import { dbLogCreate } from "../../../Utils/Database/Log";
import { logViewer } from "../../../View";

interface NewLogData {
  platform: string;
  processName: string;
  windowName: string;
}

export default async function fnLogAdd(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.gid);
  const logData: NewLogData = req.body.log;

  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.status(403).json({
        message: "User not found or unauthenticated",
      });
    }

    const currentGroup = await dbGroupGet(groupId);
    if (!currentGroup) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const requestedMember = await dbMemberGet({
      groupId,
      userId: authenticatedUser.id,
    });
    if (!requestedMember) {
      res.status(404).json({
        message: "Can not find reuqested member",
      });
    }

    const newLog = await dbLogCreate(
      authenticatedUser.id,
      currentGroup.id,
      logData,
    );
    const newLogView = logViewer(newLog);

    return res.status(201).json({ log: newLogView });
  } catch (error) {
    return next(error);
  }
}
