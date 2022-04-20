import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host:  process.env.DB_HOST || 'localhost',
        port: Number(process.env.PORT) || 5432,
        username: process.env.DB_USER || 'frankpersonal',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'db_5',
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};