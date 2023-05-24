import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbGroupCreate } from "../../Utils/Database/Group";
import { dbUserGet } from "../../Utils/Database/User";
import { groupViewer } from "../../View";

interface Group {
  name       : string,
  description: string
};

/**
 * Group controller that creates new group
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function groupCreate(
  req : Request,
  res : Response,
  next: NextFunction
) {
  const { name, description }: Group = req.body.group;
  const username = req.auth?.user?.username;

  try {
    const currentUser = await dbUserGet(username);
    if ( !currentUser ) return res.sendStatus(404);

    const group = await dbGroupCreate(
      { name, description }, currentUser.id
    );

    const groupView = groupViewer(group);

    return res.status(201).json({ group: groupView });
  } catch (error) {
    return next(error)
  }
}
