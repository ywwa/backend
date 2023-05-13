import { Router } from "express";

import usersRouter from "./api/v1/users";
import userRouter from "./api/v1/user";
import profileRouter from "./api/v1/profile";
import groupRouter from "./api/v1/group";
import memberRouter from "./api/v1/member";

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/user', userRouter);
router.use('/api/profile', profileRouter);
router.use('/api/group', groupRouter);
router.use('/api/group/member', memberRouter);

export default router;
