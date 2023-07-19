import { z } from "zod";
import validator from "validator";

import { ValidationSchema } from "src/core";

export const signUpUserSchema: ValidationSchema = {
    inputSchema: z.object({   
        firstname:  z.string(),
        lastname: z.string(),
        othername: z.string(),
        role: z.string(),
        email: z.string().email().endsWith('@gmail.com'),
        phoneNumber: z.string().refine(validator.isMobilePhone),
        sex: z.enum(["male", "female"]).default("male"),
        password: z.string().refine(validator.isStrongPassword)
    })
};


export const singInUserSchema: ValidationSchema = {
    inputSchema: z.object({
        email: z.string().email(),
        password: z.string().min(8).max(12)
    })
};