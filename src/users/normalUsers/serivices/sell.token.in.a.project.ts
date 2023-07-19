import { BadRequestError, ControllerArgs, HttpStatus, UnProcessableError } from "../../../core";
import { User } from "../../model";
import { ProjectContributions, Projects, ProjectTransactions } from "../../../projects";
import { Op } from "sequelize";
import { UserProjects } from "../../model";
import { randomBytes } from "crypto";


export class SellTokens {

    constructor(
        private readonly dbUser: typeof User,
        private readonly dbProjects: typeof Projects,
        private readonly dbProjectContribtions: typeof ProjectContributions,
        private readonly dbUserContributions: typeof UserProjects,
        private readonly dbProjectTransactions: typeof ProjectTransactions
    ){}

    sell = async ({ input, user }: ControllerArgs) => {
        const { tokenId, amount} = input;

        const project = await this.dbProjects.findByPk(tokenId);
        if(!project) throw new BadRequestError('Project not found');

        const userMadeContribution = await this.dbUserContributions.findOne({
            where: {
                [Op.and]: [
                    { project_id: project.project_id },
                    { user_id: user.id }
                ]
            }
        });
        if(!userMadeContribution) throw new BadRequestError('You don"t have any contribution to this token');

        const userContributions = await this.dbProjectContribtions.findAll({
            where: {    
                [Op.and]: [
                    { project_id: project.project_id },
                    { contributor_id: user.id }
                ]
            }  
        });

        let totalContributions: number = 0;
        userContributions.forEach((contribution: ProjectContributions) => {
            totalContributions += contribution.amount
        });

        if(+amount > totalContributions) throw new UnProcessableError("The value of your contribution is larger than your contribution to the token");

        const projectTransaction = await this.dbProjectTransactions.create({
            transaction_reference: `POPREV-${randomBytes(10).toString('hex')}.SELL.-${project.project_id}`,
            amount,
            transaction_type: 'SELL',
            made_by: user.id
        });


        return {
            code: HttpStatus.OK,
            message: "Token sold",
            data: projectTransaction,
        }
    }
}