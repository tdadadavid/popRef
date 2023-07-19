import { Op } from "sequelize";

import { logger, sequelize } from "../../core";
import { UserRoles, DefaultUserRoles } from "../model";


class RegisterDefaultUserTypes {

    handle = async () => {
        
        const theyHaveBeenRegistered = await UserRoles.findAll({
            where: {
                name: DefaultUserRoles.ADMIN,
            }
        });

        console.log(theyHaveBeenRegistered);

        if (theyHaveBeenRegistered.length !== 0) {
            console.log("here types created")
            logger.info("Default user roles has been previously registered");
            return
        };


        const txn = await sequelize.transaction();

        try{
            logger.info("User roles registration started");
            
            const roles = [
                { name: DefaultUserRoles.ADMIN },
                { name: DefaultUserRoles.USER },
                { name: DefaultUserRoles.ARTIST },
            ];

            await UserRoles.bulkCreate(roles, { transaction: txn, ignoreDuplicates: true });

            txn.commit();

            logger.info(`User roles registration sucessfully registered`)
        }catch(err: unknown){
            logger.error(err);
            txn.rollback();
        }
        
    }

}

export const registerDefaultUserRoles = new RegisterDefaultUserTypes();