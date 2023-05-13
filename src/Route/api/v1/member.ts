import { Router } from "express";
import { memberCreate } from "../../../Controller/Member";
import { authenticate } from "../../../Middleware/Auth/authenticator";

const router = Router();

router.post('/', authenticate, memberCreate);

export default router;
