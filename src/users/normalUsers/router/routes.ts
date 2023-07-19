import { Router } from "express";

import { controllerHandler } from "../../../core/middlewares";
import { makeContribution, viewRoles } from ".."
import { makeContributionSchema } from "../../validation";
import { userRolesRouter } from "./user.roles.router";

export const userRouter = Router();

// userRouter.use("/admins", adminRouter);
// userRouter.use("/artists", artistRouter);

userRouter.use("/roles", userRolesRouter);


userRouter
    .get("/contributions", controllerHandler.handle(viewRoles.view))
    .post("/contributions", controllerHandler.handle(makeContribution.contribute, makeContributionSchema));