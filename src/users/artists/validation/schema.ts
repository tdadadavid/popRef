
import { DefaultApprovalStatus } from "../../../projects"
import { ValidationSchema } from "../../../core"
import { z } from "zod"

export const submitProposalSchema: ValidationSchema = {
    inputSchema: z.object({
        name: z.string(),
        description: z.string(),
        estimatedCost: z.number().min(1),
    })
}

export const viewProjectsSchema: ValidationSchema = {
    querySchema: z.object({
        status: z.enum([
                DefaultApprovalStatus.ACCEPTED, 
                DefaultApprovalStatus.PENDING, 
                DefaultApprovalStatus.REJECTED
        ])
        .default(DefaultApprovalStatus.ACCEPTED),
    })
}