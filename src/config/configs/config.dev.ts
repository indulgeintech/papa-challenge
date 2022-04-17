import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: 'localhost',
        port: 5432,
        username: 'hello',
        password: 'world',
        database: 'papa',
        logging: false,
    }
};