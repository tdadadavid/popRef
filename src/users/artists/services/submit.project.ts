import { log } from "console";
import moment from "moment";

import { dispatch } from "src/app";
import { ConflictError, ControllerArgs, HttpStatus, NewProjectProposal, logger } from "src/core";
import { DefaultApprovalStatus, ProjectApprovalStatus, Projects } from "src/projects";
import { DefaultUserRoles, User, UserRoles } from "src/users";



export class SubmitProposal {

    constructor(
        private readonly dbProjects: typeof Projects,
        private readonly dbProjectStatus: typeof ProjectApprovalStatus,
        private readonly dbUserRoles: typeof UserRoles,
        private readonly dbUser: typeof User
    ){}

    submit = async ({ input, user }: ControllerArgs) => {
        const { name } = input;

        const projectNameIsTaken = await this.dbProjects.count({
            where: {
                name,
            }
        });
        if(projectNameIsTaken) throw new ConflictError("A similar proposal was already submitted");

        const pendingState = await this.dbProjectStatus.findOne({
            where: {
                name: DefaultApprovalStatus.PENDING
            },
        });

        const artist = await this.dbUser.findOne({
            where: {
                id: user?.id,
            }
        })

        logger.info("Creating new proposal");
        const newProposal = await this.dbProjects.create({
            name,
            description: input.description,
            estimated_amount: input.estimatedCost,
            approval_status: pendingState.status_id,
            artist: artist.id,
        });
        logger.info("Proposal created")

        const userRoles = await this.dbUserRoles.findOne({
            where: {
                name: DefaultUserRoles.ADMIN,
            },
            include: {
                model: User,
                attributes: ['email'],
                limit: 3
            } 
        });

        console.log(userRoles);

        const notificationOptions: NewProjectProposal = {
            email: "davidtofunmidada@gmail.com", //TODO:
            artist: `${artist.firstName} ${artist.lastName} ${artist.lastName}`,
            project: newProposal.name,
            estimatedCost: newProposal.estimated_amount.toString(),
            date: moment(newProposal.created_at).toISOString(),
        }
        dispatch("new:artist:project:proposal", notificationOptions);
        logger.info("Admins notification sent");

        
        return {
            code: HttpStatus.OK,
            message: "Your proposal was sent successfully"
        }
    }
}