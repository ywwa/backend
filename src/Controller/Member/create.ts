import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbMemberCreate } from "../../Util/Database/Member";

export default async function memberCreate(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const { groupId, userId } = req.body.member;

  try {
    const member = await dbMemberCreate(groupId, userId);

    return res.status(200).json({ member: member });
  } catch (error) {
    return next(error);
  }
};

