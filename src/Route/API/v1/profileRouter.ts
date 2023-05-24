import { Router } from "express";
import { profileGet } from "../../../Controller/Profile";
import { authenticate } from "../../../Middleware/Auth";

const router = Router();

router.get("/:username", authenticate, profileGet);

export default router;
