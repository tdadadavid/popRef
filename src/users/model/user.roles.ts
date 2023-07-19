
import * as moment from "moment";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";


import { sequelize } from "../../core";


export class UserRoles extends Model<
    InferAttributes<UserRoles>, InferCreationAttributes<UserRoles>
>{
    declare role_id: CreationOptional<string>;
    declare name: string;
    declare created_at?: CreationOptional<Date>;
}

UserRoles.init(
    {
        role_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV1,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'user_roles',
    }
)


export enum DefaultUserRoles {
    USER = 'user',
    ADMIN = 'admin',
    ARTIST = 'artist',
}