import { ValidationSchema } from "src/core";
import { z } from "zod";


export const makeContributionSchema: ValidationSchema = {
    inputSchema: z.object({
        projectId: z.string().uuid(),
        amount: z.string(),
    })
}


export const sellTokenSchema: ValidationSchema = {
    inputSchema: z.object({
        tokenId: z.string().uuid(),
        amount: z.string().min(0),
    })
}