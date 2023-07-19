
import * as moment from "moment";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize } from "../../core";
import { User } from "../../users";
import { Projects } from "./projects";

export enum TransactionType {
    SELL = 'SELL',
    BUY = 'BUY',
}


export class ProjectTransactions extends Model<
    InferAttributes<ProjectTransactions>, InferCreationAttributes<ProjectTransactions>
>{
    declare transaction_id: CreationOptional<string>;
    declare project_id: CreationOptional<string>;
    declare transaction_reference: string;
    declare amount: number;
    declare percentage_contribution: CreationOptional<number>;
    declare current_cutribution: CreationOptional<number>;
    declare transaction_type: string;
    declare made_by: CreationOptional<string>;
    declare created_at: CreationOptional<Date | null>;
}

ProjectTransactions.init(
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
        transaction_type: {
            type: DataTypes.ENUM,
            values:  [
                TransactionType.SELL,
                TransactionType.BUY,
            ],
            defaultValue: TransactionType.SELL,
        },
        transaction_reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
        made_by: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.DATE,
        },
    },
    {
        sequelize,
        timestamps: true,
        tableName: 'project_transactions',
        modelName: 'project_transactions',
    }
)