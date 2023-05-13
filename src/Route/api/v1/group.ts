import { Router } from "express";
import {
  groupCreate,
  groupDelete,
  groupGet,
  groupUpdate
} from "../../../Controller/Group";
import { authenticate } from "../../../Middleware/Auth/authenticator";
import * as validator from "../../../Middleware/Validator/Group";

const router = Router();

router.post(
  '/create',
  authenticate,
  validator.createValidator,
  groupCreate
);

router.get(
  '/:id',
  authenticate,
  groupGet
);

router.put(
  '/:id',
  authenticate,
  validator.updateValidator,
  groupUpdate
);

router.delete(
  '/:id',
  authenticate,
  groupDelete
);

export default router;

