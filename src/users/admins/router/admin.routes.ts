import { Router } from "express";
import { controllerHandler } from "src/core";
import { createRole, decideOnProposal, seeProjectProposals } from "../services";

export const adminRouter = Router();


adminRouter
    .post('/decision', controllerHandler.handle(decideOnProposal.make))
    .post('/roles', controllerHandler.handle(createRole.create))
    .get('/proposals', controllerHandler.handle(seeProjectProposals.view));