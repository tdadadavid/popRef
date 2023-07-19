import { Router } from "express";
import { controllerHandler } from "../../core/middlewares";
import { seeProjectTxn, seeProjects } from "../services";

export const projectRouter = Router();

projectRouter
    .get('/', controllerHandler.handle(seeProjects.see))
    .get('/:token_id/transactions', controllerHandler.handle(seeProjectTxn.see))