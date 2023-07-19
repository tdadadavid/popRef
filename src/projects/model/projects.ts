import { ForeignKey, UUIDV4, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import * as uuid from "uuid";

import { sequelize } from "../../core";
import { ProjectApprovalStatus } from "./project.approval.status";
import { User } from "../../users";


export class Projects extends Model<
    InferAttributes<Projects>, InferCreationAttributes<Projects>
>{
    declare project_id: CreationOptional<string>;
    declare name: string;
    declare description: string;
    declare estimated_amount: number;
    declare contribution_percentage: number;
    declare current_contribution: number;
    declare approval_status: ForeignKey<string>;
    declare artist: ForeignKey<string>
    declare still_accepts_contribution: boolean;
    declare approved_at?: CreationOptional<Date | null>;
    declare rejected_at?: CreationOptional<Date | null>;
    declare created_at?: CreationOptional<Date>;
    declare deleted_at?: CreationOptional<Date>;

    contributionIsMature = (): boolean => {
        return this.current_contribution >= this.estimated_amount;
    }

}

Projects.init(
    {
        project_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 100,
            }
        },
        estimated_amount: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        contribution_percentage: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        current_contribution: {
            type: DataTypes.NUMBER,
            allowNull: true,
            defaultValue: 0,
        },
        approval_status: {
            type: DataTypes.UUID,
            references: {
                model: ProjectApprovalStatus,
                key: 'status_id'
            }
        },
        artist: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id'
            }
        },
        still_accepts_contribution: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {   
        sequelize,
        timestamps: true,
        modelName: 'project',
    }
)