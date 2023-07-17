import { sequelize } from '../config/database';

export const initializeDbConnection = async () => {
    sequelize.sync()
}

export const initializeRedisConnection = async () => {
    return Promise.resolve();
}