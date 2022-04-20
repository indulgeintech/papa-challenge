import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { Visit } from './entity';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [VisitsController],
  providers: [VisitsService, { provide: 'VisitsRepository', useValue: Visit }]
})
export class VisitsModule {}
