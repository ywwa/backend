import { Router } from "express";
import {
  groupCreate,
  groupDelete,
  groupGet,
  groupUpdate,
  memberAdd,
  memberGet,
  membersGet
} from "../../../Controller/Group";
import { authenticate } from "../../../Middleware/Auth";
import * as validator from "../../../Middleware/Validator/Group";

const router = Router();

// Create group
router.post("/create", authenticate, validator.createValidator, groupCreate);

// Get group
router.get("/:id", authenticate, groupGet);

// Update group
router.put("/:id", authenticate, validator.updateValidator, groupUpdate);

// Delete group
router.delete("/:id", authenticate, groupDelete);

// Add member to group
router.post("/:id/members", authenticate, memberAdd);

// Get member from group
router.get("/:gid/member/:mid([0-9]+)", authenticate, memberGet);
// Get all members from group
router.get("/:id/members", authenticate, membersGet);

// Remove member from group
// router.delete("/:id/members/:mid([0-9]+)", authenticate, memberRemove);

// Add log to member
// router.post("/:id/members/:mid([0-9]+)", authenticate, logAdd);

// Get logs from certain member
// router.get("/:id/members/:mid([0-9]+)", authenticate, logsGetMember);

// // get all logs from all members in group
// router.get("/:id/logs", authenticate, logsGetAll);

export default router;
