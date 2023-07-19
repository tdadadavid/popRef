import { ControllerArgs, HttpStatus } from "../../core";
import { ProjectContributions, ProjectTransactions } from "../../projects"
import { Op } from "sequelize";


export class SeeTransactions {
    constructor(
        private readonly dbUserContributions: typeof ProjectContributions,
        private readonly dbProjectTransactions: typeof ProjectTransactions,
    ){}

    see = async ({ input, query }: ControllerArgs) => {

        let limit = parseInt(query.limit) || 10;
        let page = parseInt(query.page) || 1;
        
        let offset = (page - 1) * limit;
        
        const { tokenId } = input;

        const buy = await this.dbUserContributions.findAndCountAll({
            where: {
                project_id: tokenId
            },
            limit,
            offset
        });

        const sell = await this.dbProjectTransactions.findAndCountAll({
            where: {
                project_id: tokenId,
            },
            limit,
            offset
        })

        const totalCount = buy.count;
      
          // Calculate the total number of pages based on the total count and limit.
        const totalPages = Math.ceil(totalCount / limit);
        
        return {
            code: HttpStatus.OK,
            message: 'All projects(tokens)',
            data: {
                buy,
                sell,
            },
            meta: {
                totalPages,
                totalCount,
            }
        };
    }
}