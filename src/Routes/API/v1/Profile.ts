import { Router } from "express";
import { profileGet } from "../../../Controller/ProfileController";
import {
  optionalAuthenticate 
} from "../../../Middleware/Auth/authenticator";

const router = Router();

router.get('/:username', optionalAuthenticate, profileGet);

export default router;
