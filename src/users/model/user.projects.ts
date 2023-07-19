
import moment from "moment";
import { UUID, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, ForeignKey } from "sequelize";


import { sequelize } from "../../core";
import { Projects } from "../../projects";
import { User } from "./user";


export class UserProjects extends Model<
    InferAttributes<UserProjects>, InferCreationAttributes<UserProjects>
>{
    declare user_project_id: CreationOptional<string>;
    declare project_id: ForeignKey<Projects>;
    declare user_id: ForeignKey<User>
    declare created_at: CreationOptional<Date | null>;
}

UserProjects.init(
    {
        user_project_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: UUID(),
        },
        project_id: {
            type: DataTypes.STRING,
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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: moment().toDate(),
            
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
    }
)