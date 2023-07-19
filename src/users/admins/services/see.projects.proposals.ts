import { Op } from "sequelize";


import { ControllerArgs, HttpStatus } from "../../../core";
import { Projects } from "../../../projects";


export class SeeProjectsProposal {

    constructor(private readonly dbProjects: typeof Projects){}

    view = async ({ query }: ControllerArgs) => {
        const sortBy = query.sort || 'created_at';

        let limit = parseInt(query.limit) || 10;
        let page = parseInt(query.page) || 1;
        
        let offset = (page - 1) * limit;

        const proposalsAndCount = await this.dbProjects.findAndCountAll({
            where: {
                [Op.not]: [
                    { approved_at: null },
                    { rejected_at: null },
                ],
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