import { ValidationSchema } from "../../core";
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

export const seeTransactionsForProjectSchema: ValidationSchema = { 
    inputSchema: z.object({
        tokenId: z.string().uuid(),
    }),
    querySchema: z.object({
        limit: z.number(),
        page: z.number(),
    })
}