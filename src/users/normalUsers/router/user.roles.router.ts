import { Router } from "express";
import { controllerHandler } from "../../../core/middlewares"
import { viewRoles } from "..";

export const userRolesRouter = Router();

userRolesRouter
    .get("/", controllerHandler.handle(viewRoles.view))