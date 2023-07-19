import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKey
} from 'sequelize';


import { sequelize } from '../../core';
import { UserRoles } from './user.roles';

export class User extends Model<
    InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<string>;
    declare firstName: string;
    declare lastName: string;
    declare otherName: CreationOptional<string | null>;
    declare email: string;
    declare role: ForeignKey<string>
    declare password?: CreationOptional<string | null>;
    declare verifyToken: CreationOptional<string | null>;
    declare verifyTokenExpiresIn: CreationOptional<Date | null>;
    declare isVerified: CreationOptional<boolean>;
    declare createdAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>;

    fullName = () => `${this.firstName} ${this.lastName} ${this.otherName.charAt(0).toUpperCase()}`;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otherName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        verifyToken: DataTypes.STRING,
        verifyTokenExpiresIn: DataTypes.DATE,
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        role: {
            type: DataTypes.UUID,
            references: {
                model: UserRoles,
                key: 'role_id',
            }
        }
    },
    {
        modelName: 'user',
        sequelize,
        timestamps: true,
    },
);