import { Router } from "express";
import { currentUser } from "../../../auth";
import { controllerHandler, submitPrposalLimiter } from "../../../core";
import { submitProposal, viewProjects } from "../services";
import { submitProposalSchema, viewProjectsSchema } from "../validation";


export const artistRouter = Router();

artistRouter
    .use(currentUser.handle)
    .post('/proposals', submitPrposalLimiter, controllerHandler.handle(submitProposal.submit, submitProposalSchema))
    .get('/proposals', controllerHandler.handle(viewProjects.view, viewProjectsSchema));