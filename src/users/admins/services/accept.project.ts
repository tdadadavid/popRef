
import * as moment from "moment";

import { dispatch } from "../../../app";
import { AdminProjectDecisionOptions, BadRequestError, ControllerArgs, HttpStatus, logger } from "../../../core";
import { DefaultApprovalStatus, ProjectApprovalStatus, Projects } from "../../../projects";
import { User } from "../../model"


export class DecideOnProposal {
    constructor(
        private readonly dbUser: typeof User,
        private readonly dbProject: typeof Projects,
        private readonly dbProjectStatus: typeof ProjectApprovalStatus
    ){}

    accept = async ({input}: ControllerArgs) => {
        const { projectId, accept } = input;

        const project = await this.dbProject.findByPk(projectId);
        if(!project) throw new BadRequestError("Project proposal not found");

        let accpetanceStatus: DefaultApprovalStatus;
        let isAccepted: boolean = false;

        if(accept === "true"){
            accpetanceStatus = DefaultApprovalStatus.ACCEPTED;
            isAccepted = true;
        }else{
            accpetanceStatus = DefaultApprovalStatus.REJECTED;
        }

        const acceptedStatus = await this.dbProjectStatus.findOne({
            where: {
                name: accpetanceStatus,
            }
        })

        project.approval_status = acceptedStatus.status_id;

        if(isAccepted)
            project.approved_at = moment().toDate();
        else
            project.rejected_at = moment().toDate();

        
        await project.save();

        logger.info(`Project proposal ${ isAccepted ? "Accepted" : "Rejected"}.`);

        const aritist = await this.dbUser.findByPk(project.artist);
        
        const projectAcceptedOptions: AdminProjectDecisionOptions = {
            name: aritist.fullName(),
            email: aritist.email,
            project: project.name,
            status: isAccepted ? "Approved" : "Rejected",
        }

        isAccepted
            ? projectAcceptedOptions.accepted_at = project.approved_at.toLocaleDateString()
            : projectAcceptedOptions.rejected_at = project.rejected_at.toLocaleDateString()

        dispatch("project:proposal:accepted", projectAcceptedOptions);

        return {
            code: HttpStatus.OK,
            message: "Project status updated successfully."
        }
    }
}