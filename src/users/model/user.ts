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
    InferAttributes<User>, InferCreationAttributes<User>
>{
    declare id: CreationOptional<string>;
    declare firstname: string;
    declare lastname: string;
    declare othername: CreationOptional<string>;
    declare email: string;
    declare role: ForeignKey<UserRoles['role_id']>
    declare password?: CreationOptional<string| null>;
    declare createdAt?: CreationOptional<Date>;
    declare updatedAt?: CreationOptional<Date>;

    fullName = () => `${this.firstname} ${this.lastname} ${this.othername.charAt(0).toUpperCase()}`;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            allowNull: false,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        othername: {
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
            allowNull: false,
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
        defaultScope: {
            attributes: {
                exclude: [
                    'password',
                ]
            }
        },
        scopes: {
            withPassword: {
                attributes: {
                    include: [
                        'password'
                    ]
                }
            },
        },
        modelName: 'users',
        sequelize,
        tableName: 'users',
        timestamps: true,
    },
);