import { Router } from "express";
import { userGet, userUpdate } from "../../../Controller/User";
import { authenticate } from "../../../Middleware/Auth";
import { updateValidator } from "../../../Middleware/Validator/User";

const router = Router();

router.get("/", authenticate, userGet);
router.put("/", authenticate, updateValidator, userUpdate);

export default router;
