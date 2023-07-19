import { ControllerArgs, HttpStatus } from "../../../core";
import { Projects, ProjectApprovalStatus, DefaultApprovalStatus } from "../../../projects";
import { User } from "../../../users/model";


export class ViewProjects {

    constructor(
        private readonly dbUser: typeof User,
        private readonly dbProject: typeof Projects,
        private readonly dbProjectApprovalStatus: typeof ProjectApprovalStatus
    ){}

    view = async ({ query, user }: ControllerArgs) => {
        const filter = query.status || DefaultApprovalStatus.ACCEPTED;

        const approval_status = await this.dbProjectApprovalStatus.findOne({
            where: {
                name: filter,
            }
        })

        const userProposals = await this.dbProject.findAll({
            where: {
                artist: user.id,
                approval_status: approval_status.status_id,
            }
        });

        return {
            code: HttpStatus.OK,
            message: "All proposals",
            data: userProposals,
        }
    }
}