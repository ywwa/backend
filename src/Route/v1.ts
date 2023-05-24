import { Router } from "express";

import usersRouter from "./API/v1/usersRouter";
import userRouter from "./API/v1/userRouter";
import profileRouter from "./API/v1/profileRouter";
import groupRouter from "./API/v1/groupRouter";

const router = Router();

// API V1 routes bind here
router.use('/users', usersRouter);
router.use('/user', userRouter);
router.use('/profile', profileRouter);
router.use('/group', groupRouter);

export default router;
