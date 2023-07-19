
import { z } from "zod"

export const submitProposalSchema = {
    inputSchema: z.object({
        name: z.string(),
        description: z.string(),
        estimatedCost: z.number().min(1),
    })


}