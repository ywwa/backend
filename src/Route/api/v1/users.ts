import { Router } from "express";
import {
  usersRegister,
  usersLogin
} from "../../../Controller/Users";
import * as validator from "../../../Middleware/Validator/User";

const router = Router();

router.post('/', validator.registerValidator, usersRegister);

router.post('/login', validator.loginValidator, usersLogin);

export default router;
