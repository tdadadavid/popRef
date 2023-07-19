import { Router } from "express";

import { controllerHandler } from "../../../core/middlewares";
import { makeContribution, sellToken, viewRoles } from "../serivices"
import { makeContributionSchema } from "../../validation";
import { userRolesRouter } from "./user.roles.router";
import { currentUser } from "../../../auth/services/current.user";
import { artistRouter } from "../../artists";
import {adminRouter} from "../../admins";

export const userRouter = Router();

userRouter.use("/admins", adminRouter);
userRouter.use("/artists", artistRouter);
userRouter.use("/roles", userRolesRouter);

userRouter
    .use(currentUser.handle)
    .get("/contributions", controllerHandler.handle(viewRoles.view))
    .post("/contributions", controllerHandler.handle(makeContribution.contribute, makeContributionSchema))
    .post('/sell', controllerHandler.handle(sellToken.sell))