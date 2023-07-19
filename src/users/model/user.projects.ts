
import moment from "moment";
import { UUID, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, ForeignKey } from "sequelize";


import { sequelize } from "../../core";
import { Projects } from "../../projects";
import { User } from "./user";


export class UserProjects extends Model<
    InferAttributes<UserProjects>, InferCreationAttributes<UserProjects>
>{
    declare user_project_id: CreationOptional<string>;
    declare project_id: ForeignKey<string>;
    declare user_id: ForeignKey<string>
    declare created_at?: CreationOptional<Date>;
}

UserProjects.init(
    {
        user_project_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUID,
        },
        project_id: {
            type: DataTypes.UUID,
            references: {
                model: Projects,
                key: 'project_id',
            }
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        tableName: 'user_projects',
        modelName: 'user_projects'
    }
)