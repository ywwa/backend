import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbMembersGet } from "../../../Utils/Database/Member";
import { memberViewer } from "../../../View";

export default async function membersGet(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const groupId = parseInt(req.params.groupId);

  try {
    const members = await dbMembersGet(groupId);

    const membersView = members.map( (member) => {
      memberViewer(member);
    });

    return res.json({ members: membersView });
  } catch (error) {
    return next(error);
  }
}
