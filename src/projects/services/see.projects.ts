import { ControllerArgs, HttpStatus } from "../../core";
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

        const acceptedProposalsAndCount = await this.dbProjects.findAndCountAll({
            where: {
               approval_status: acceptedApprovalStatus.status_id
            },
            limit,
            offset,
        });

        console.log(acceptedProposalsAndCount);

        //@ts-ignore
        const totalCount = acceptedProposalsAndCount.count;
      
          // Calculate the total number of pages based on the total count and limit.
          const totalPages = Math.ceil(totalCount / limit);
      
          return {
            code: HttpStatus.OK,
            message: 'All projects(tokens)',
            data: {
                //@ts-ignore
                tokens: acceptedProposalsAndCount.rows
            },
            meta: {
                totalCount,
                totalPages,
            }
          };
    }
}