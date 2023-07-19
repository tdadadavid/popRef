import { Router } from "express";
import { authRouter } from "../auth";

export const appRouter = Router();

appRouter.use("/auth", authRouter);

