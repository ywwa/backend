import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbGroupCreate } from "../../Util/Database/Group";
import { dbUserGet } from "../../Util/Database/User";
import { groupViewer } from "../../View";

interface Group {
  name       : string,
  description: string
};

/**
 * Controller that creates new group on authenticated user and group info in
 * the request body
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
    if ( !currentUser ) return res.sendStatus(401);

    const group = await dbGroupCreate(
      { name, description },
      currentUser.id
    );

    const view = groupViewer(group);
    return res.status(201).json({ group: view });
  } catch (error) {
    return next(error);
  };
}

