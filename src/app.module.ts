import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { VisitsModule } from './visits/visits.module';

@Module({
    imports: [UsersModule, ConfigModule, VisitsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
