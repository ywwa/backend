import { Router } from "express";
import {
  groupCreate,
  groupGet,
  groupUpdate,
  groupDelete,
  memberAdd,
  membersGet,
  memberRemove
} from "../../../Controller/Group";
import { authenticate } from "../../../Middleware/Auth";
import * as validator from "../../../Middleware/Validator/Group";

const router = Router();

router.post('/create', authenticate, validator.createValidator, groupCreate);
router.get('/:id', authenticate, groupGet);
router.put('/:id', authenticate, validator.updateValidator, groupUpdate);
router.delete('/:id', authenticate, groupDelete);

router.post('/:id/members', authenticate, validator.addValidator, memberAdd);
router.get('/:id/members', authenticate, membersGet);
router.delete('/:id/members/:mid([0-9]+)', authenticate, memberRemove);


export default router;
