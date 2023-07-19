import { Router } from "express";

import { controllerHandler } from "../../../core/middlewares";
import { makeContribution, seeTransactionsForProject, sellToken, viewRoles } from "../serivices"
import { makeContributionSchema, seeTransactionsForProjectSchema, sellTokenSchema } from "../../validation";
import { userRolesRouter } from "./user.roles.router";
import { currentUser } from "../../../auth/services/current.user";
import { artistRouter } from "../../artists";
import {adminRouter} from "../../admins";
import { isAdmin, isArtist } from "src/users/middlewares";

export const userRouter = Router();

userRouter.use(currentUser.handle);

userRouter.use("/admins", [isAdmin], adminRouter);
userRouter.use("/artists",[isArtist], artistRouter);
userRouter.use("/roles", userRolesRouter);

userRouter
    .get("/transactions", controllerHandler.handle(seeTransactionsForProject.see, seeTransactionsForProjectSchema))
    .post("/transactions", controllerHandler.handle(makeContribution.contribute, makeContributionSchema))
    .post('/sell', controllerHandler.handle(sellToken.sell,sellTokenSchema))