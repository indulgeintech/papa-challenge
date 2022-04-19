import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Task, Transaction, Visit } from '../visits/entity';
import { ConfigService } from '../config/config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeConfig);
            sequelize.addModels([User,Transaction,Visit,Task]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];