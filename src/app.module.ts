import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';

@Module({
    imports: [UsersModule, ConfigModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
