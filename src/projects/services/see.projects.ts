import { ControllerArgs, HttpStatus } from "src/core";
import { DefaultApprovalStatus, ProjectApprovalStatus, Projects } from "../model";


export class SeeProjects {
    constructor(
        private readonly dbProjects: typeof Projects,
        private readonly dbProjectApprovalStatus: typeof ProjectApprovalStatus
    ) {}

    see = async ({ query }: ControllerArgs) => {
        const sortBy = query.sort || 'created_at';

        let limit = parseInt(query.limit) || 10;
        let page = parseInt(query.page) || 1;
        
        let offset = (page - 1) * limit;

        const acceptedApprovalStatus = await this.dbProjectApprovalStatus.findOne({
            where: {
                name: DefaultApprovalStatus.ACCEPTED,
            }
        });

        const proposalsAndCount = await this.dbProjects.findAndCountAll({
            where: {
               approval_status: acceptedApprovalStatus.status_id
            },
            order: [
                [sortBy, 'ASC'],
            ],
            limit,
            offset,
        });

        const totalCount = proposalsAndCount.count;
      
          // Calculate the total number of pages based on the total count and limit.
          const totalPages = Math.ceil(totalCount / limit);
      
          // You can return the proposals, totalCount, and totalPages to the frontend or handle them as needed.
          return {
            code: HttpStatus.OK,
            message: 'Pending project proposals',
            data: {
                proposals: proposalsAndCount.rows
            },
            meta: {
                totalCount,
                totalPages,
            }
          };
    }
}