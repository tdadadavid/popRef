import { Op } from "sequelize";

import { logger, sequelize } from "../../core";
import { DefaultApprovalStatus, ProjectApprovalStatus } from "../../projects";

class RegisterDefaultApprovalStatus {

    handle = async () => {

        const theyHaveBeenRegistered = await ProjectApprovalStatus.findAll({
            where: {
                [Op.or]: [
                    { name: DefaultApprovalStatus.ACCEPTED },
                    { name: DefaultApprovalStatus.REJECTED },
                    { name: DefaultApprovalStatus.PENDING }
                ]
            }
        });

        if (theyHaveBeenRegistered.length !== 0) {
            logger.info("Default approval status has been previously registered");
            return
        };


        const txn = await sequelize.transaction()
        try{
            logger.info("Project status registration started");

            const status = [
                { name: DefaultApprovalStatus.ACCEPTED, description: "Project accpeted"},
                { name: DefaultApprovalStatus.REJECTED, description: "Project rejected"},
                { name: DefaultApprovalStatus.PENDING, description: "Project still in check."},
            ];

            await ProjectApprovalStatus.bulkCreate(status, { transaction: txn, ignoreDuplicates: true });
            txn.commit();

            logger.info(`Project status registration sucessfully registered`)
        }catch(err: unknown){
            logger.error(err);
            txn.rollback();
        }
        
    }

}

export const registerDefaultApprovalStatus = new RegisterDefaultApprovalStatus();