import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [UsersModule, VisitsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
