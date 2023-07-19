
import * as moment from "moment";
import * as uuid from "uuid";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize } from "../../core";
import { User } from "../../users";
import { Projects } from "./projects";

export class ProjectContributions extends Model<
    InferAttributes<ProjectContributions>, InferCreationAttributes<ProjectContributions>
>{
    declare transaction_id: CreationOptional<string>;
    declare project_id: CreationOptional<string>;
    declare amount: number;
    declare percentage_contribution: number;
    declare current_cutribution: number;
    declare contributor_id: CreationOptional<string>;
    declare created_at: CreationOptional<Date | null>;
}

ProjectContributions.init(
    {
        transaction_id: {
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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: moment().toDate(),
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'project_contributions',
    }
)
