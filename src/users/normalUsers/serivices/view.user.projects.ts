import { ControllerArgs, HttpStatus } from "../../../core";
import { UserProjects } from "../../model/user.projects";
import { Projects } from "../../../projects";



export class ViewProjectsContributingTo {
    constructor(private readonly dbUserProjects: typeof UserProjects){}

    view = async ({ user }: ControllerArgs) => {
        const userId: string = user?.id;

        const userProjects = await this.dbUserProjects.findAll({
            where: {
                user_id: userId
            },
            include: {
                model: Projects,
            }
        });

        return {
            code: HttpStatus.OK,
            message: "All projects you're contributing to.",
            data: userProjects,
        }
    }
}