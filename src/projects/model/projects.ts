import { ForeignKey, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

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
    declare approval_status: ForeignKey<ProjectApprovalStatus['status_id']>;
    declare artist: ForeignKey<User['id']>
    declare still_accepts_contribution: boolean;
    declare approved_at?: CreationOptional<Date>;
    declare rejected_at?: CreationOptional<Date>;
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
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 100,
            }
        },
        estimated_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contribution_percentage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        current_contribution: {
            type: DataTypes.TINYINT,
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
        }
    },
    {   
        sequelize,
        timestamps: true,
        tableName: 'projects',
        modelName: 'projects',
    }
)