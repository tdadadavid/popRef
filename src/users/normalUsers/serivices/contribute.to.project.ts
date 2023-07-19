import { randomBytes } from "crypto";
import * as moment from "moment";


import { BadRequestError, ControllerArgs, NewContributionNotificationOptions, logger, sequelize } from "../../../core";
import { ProjectContributions, Projects, ProjectTransactions, TransactionType } from "../../../projects";
import { dispatch } from "../../../app";
import { User } from "../../model";


export class MakeContribution {

    constructor(
        private readonly dbUser: typeof User,
        private readonly dbProject: typeof Projects,
        private readonly dbProjectContributions: typeof ProjectContributions,
        private readonly dbProjectTransactions: typeof ProjectTransactions
    ){}

    contribute = async ({ input, user }: ControllerArgs) => {
        let { projectId, amount } = input;
        
        const txn = await sequelize.transaction();

        try{
            const project = await this.dbProject.findByPk(projectId);
            if(project) throw new BadRequestError("Project not found.");

            amount = parseInt(amount, 10);

            const percentageContribution = this.calcPercentageContribution(amount, +project.estimated_amount);

            logger.info("New Project contribution");

            const transaction = await this.dbProjectTransactions.create({
                project_id: project.project_id,
                amount,
                percentage_contribution: percentageContribution,
                transaction_type: TransactionType.BUY,
                made_by: user.id,
                transaction_reference: `POPREV-${randomBytes(10).toString('hex')}-${project.project_id}`
            });

            logger.info("Updating project contribution");

            project.current_contribution += amount;
            project.contribution_percentage = (project.current_contribution / project.estimated_amount) * 100;
            await project.save(); 

            logger.info("Updated project current contribution");
            

            const contributors = await this.dbProjectContributions.findAll({
                include: {
                    model: User,
                    attributes: ['email']
                }
            });

            // const transactionNotificationOptions: NewContributionNotificationOptions = {
            //     emails: contributors as any, //TODO: 
            //     amount,
            //     when: transaction.created_at.toLocaleDateString(),
            // }
            // dispatch('new:contribution', transactionNotificationOptions);

            if(project.contributionIsMature()) {
                const admins = await this.dbUser.findAll({
                    
                })
                const projectMaturityNotificationOptions = {
                    amount,
                    maturity_data: moment().toLocaleString(),
                    admin: "davidtofunmidada@gmail.com",
                    contributors: contributors,
                }
                dispatch("project:maturity:reached", projectMaturityNotificationOptions)
            }

            txn.commit();
        }catch(err: unknown){
            logger.error(err);
            txn.rollback();
        }
        
    }

    private calcPercentageContribution = (contributedAmount: number, estimatedCost: number): number => {
        return (contributedAmount / estimatedCost) * 100;
    }
}