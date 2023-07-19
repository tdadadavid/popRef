import * as moment from "moment";
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize } from "../../core";
import { User } from "../../users";
import { Projects } from "./projects";

export class ProjectContributions extends Model<
    InferAttributes<ProjectContributions>, InferCreationAttributes<ProjectContributions>
>{
    declare contribution_id: CreationOptional<string>;
    declare project_id: ForeignKey<string>;
    declare amount: number;
    declare percentage_contribution: number;
    declare current_cutribution: number;
    declare contributor_id: ForeignKey<User['id']>;
    declare created_at?: CreationOptional<Date>;
}

ProjectContributions.init(
    {
        contribution_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        project_id: {
            type: DataTypes.UUID,
            references: {
                model: Projects,
                key: 'project_id',
            },
        },
        percentage_contribution: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        current_cutribution: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0
        },
        amount: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
            allowNull: false,
        },
        contributor_id: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        tableName: 'project_contributions',
        modelName: 'project_contributions',
    }
)
