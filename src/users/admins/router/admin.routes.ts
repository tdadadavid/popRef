import { Router } from "express";
import { currentUser } from "src/auth";
import { controllerHandler } from "src/core";
import { isAdmin } from "src/users/middlewares";
import { createRole, decideOnProposal, seeProjectProposals } from "../services";

export const adminRouter = Router();


adminRouter
    .use([currentUser.handle, isAdmin])
    .post('/decision', controllerHandler.handle(decideOnProposal.make))
    .post('/roles', controllerHandler.handle(createRole.create))
    .get('/proposals', controllerHandler.handle(seeProjectProposals.view));