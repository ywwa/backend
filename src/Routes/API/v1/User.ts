import { Router } from "express";
import { 
  userGet,
  userUpdate
} from "../../../Controller/UserController";
import { authenticate } from "../../../Middleware/Auth/authenticator";
import { userUpdateValidator } from "../../../Middleware/Validator/userValidator";

const router = Router();

router.get('/', authenticate, userGet);
router.put('/', authenticate, userUpdateValidator, userUpdate);

export default router;

