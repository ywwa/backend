import { Router } from "express";
import {
  userRegister,
  userLogin
} from "../../../Controller/AuthController"
import * as validator from "../../../Middleware/Validator/userValidator";

const router = Router();

router.post('/', validator.userRegisterValidator, userRegister);

router.post("/login", validator.userLoginValidator, userLogin);

export default router;

