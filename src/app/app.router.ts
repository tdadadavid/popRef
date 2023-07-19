import { Request, Router, Response } from "express";

import { authRouter } from "../auth";
import { HttpStatus } from "../core";
import { userRouter } from "../users";
import { projectRouter } from "../projects";

export const appRouter = Router();


appRouter.use("/auth", authRouter);
appRouter.use("/users", userRouter);
appRouter.use("/tokens", projectRouter);


appRouter.get('/health', (_: Request, res: Response) => {
    res.status(HttpStatus.OK).json({
        message: "App up",
        version: "1.0",
    })
});
