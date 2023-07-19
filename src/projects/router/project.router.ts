import { Router } from "express";
import { controllerHandler } from "../../core/middlewares";
import { seeProjects } from "../services";

export const projectRouter = Router();

projectRouter
    .get('/', controllerHandler.handle(seeProjects.see))
    .get('/:project_id/transactions', controllerHandler.handle(()=>{}))
    .get('/:project_id/contributions', controllerHandler.handle(()=>{}))