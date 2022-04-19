import { Injectable } from '@nestjs/common';
import config from './configs/';

@Injectable()
export class ConfigService {
    get sequelizeConfig() {
        return config.database;
    }

    get jwtConfig() {
        return { privateKey: config.jwtPrivateKey };
    }
}