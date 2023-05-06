import { Router } from "express";

import usersRouter from "./v1/Auth";
import userRouter  from "./v1/User";
import profileRouter from "./v1/Profile";

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/user', userRouter);
router.use('/api/profile', profileRouter);

export default router;
