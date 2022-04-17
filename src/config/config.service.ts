import { Injectable } from '@nestjs/common';
import config from './configs/';

@Injectable()
export class ConfigService {
    get sequelizeConfig() {
        return config.database;
    }
}