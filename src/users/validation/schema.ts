import { ValidationSchema } from "src/core";
import { z } from "zod";


export const makeContributionSchema: ValidationSchema = {
    inputSchema: z.object({
        projectId: z.string().uuid(),
        amount: z.string(),
    })
}

