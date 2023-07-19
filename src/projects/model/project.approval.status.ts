import * as moment from "moment";
import * as uuid from "uuid";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize } from "../../core";


export class ProjectApprovalStatus extends Model<
    InferAttributes<ProjectApprovalStatus>, InferCreationAttributes<ProjectApprovalStatus>
>{
    declare status_id: CreationOptional<string>;
    declare name: string;
    declare description: string;
    declare created_at?: CreationOptional<Date>;
}

ProjectApprovalStatus.init(
    {
        status_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                max: 100,
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'project_approval_status',
    }
)


export enum DefaultApprovalStatus {
    PENDING = 'pending',
    REJECTED = 'rejected',
    ACCEPTED = 'accepted'
}