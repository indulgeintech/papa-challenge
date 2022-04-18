import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService,
    { provide: 'UsersRepository', useValue: User },
  ],
  exports: [UsersService]
})
export class UsersModule { }
