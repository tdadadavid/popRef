
import { User, UserRoles } from '../../users';
import { sequelize } from '../config';
import { ProjectApprovalStatus, ProjectContributions, ProjectTransactions, Projects } from '../../projects';
import { logger } from '../logging';

export const initializeDbConnection = async () => {
    await sequelize
        .sync({ force: true })
        .then(initializeAssociations)
        .catch(logger.debug)
}

const initializeAssociations = async () => {

    User.belongsTo(UserRoles);
    UserRoles.hasMany(User);
    
    User.hasMany(Projects);
    Projects.belongsTo(User);
    
    ProjectApprovalStatus.belongsTo(Projects);
    Projects.hasOne(ProjectApprovalStatus);
    
    ProjectContributions.belongsTo(Projects);
    Projects.hasMany(ProjectContributions);
    
    ProjectTransactions.belongsTo(Projects);
    Projects.hasMany(ProjectTransactions);
}