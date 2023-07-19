import { Router } from "express";

import { authRateLimiter } from "../../core";
import { controllerHandler } from "../../core/middlewares";
import { signIn, signUp } from "../services";
import { signUpUserSchema, singInUserSchema } from "../validation";

export const authRouter = Router();

authRouter
    .use(authRateLimiter)
    .post('/signUp', controllerHandler.handle(signUp.signUp, signUpUserSchema))
    .post('/signIn', controllerHandler.handle(signIn.sign, singInUserSchema))