import { Router } from "express";


import { authRateLimiter, controllerHandler } from "../../core";
import { signIn } from "../services";
import { signUpUserSchema, singInUserSchema } from "../validation";

export const authRouter = Router();

// authRouter
//     .use(authRateLimiter)
//     .get('/signUp', controllerHandler.handle(signUp.signUp, signUpUserSchema))
//     .post('/signIn', controllerHandler.handle(signIn.sign, singInUserSchema))