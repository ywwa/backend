import { Router } from "express";
import {
  usersRegister,
  usersLogin
} from "../../../Controller/Users";
import * as validator from "../../../Middleware/Validator/User";

const router = Router();

// User Registration & Authorization routes
router.post(
  '/register',
  validator.registerValidator,
  usersRegister
);

router.post(
  '/login',
  validator.loginValidator,
  usersLogin
);


export default router;
