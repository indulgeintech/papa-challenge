import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import * as uuid from 'uuid';
import { Role } from '../users/dtos/user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateVisit } from './dtos/create-visit.dto';
import { FufillVisitDto } from './dtos/fufill-visit.dto';
import { TaskDto } from './dtos/task.dto';
import { VisitDto, VisitStatus } from './dtos/visit.dto';
import { Task } from './entity';
import { Visit } from './entity/visit.entity';

const MINMUM_VISIT_THRESHOLD = 5;
@Injectable()
export class VisitsService {
   constructor(
      @Inject('VisitsRepository')
      private readonly visitsRepository: typeof Visit,
      @Inject('SEQUELIZE')
      private readonly sequelize: Sequelize,
      private readonly userService: UsersService,
   ) {

   }
   async createVisit(userId: string, createVisit: CreateVisit): Promise<VisitDto> {
      const { date, tasks } = createVisit;
      const visitId = uuid.v4();
      const taskRecords = await Promise.all(tasks.map((task) => this.createTaskRecord(task, visitId)));
      const userRecord = await this.userService.getUserRecord(userId);
      if (!userRecord.role.includes(Role.member)) {
         throw new HttpException(
            "User isn't a member please update registration you must be a member to create visits",
            HttpStatus.UNPROCESSABLE_ENTITY,
         );
      }
      if (userRecord.balance <= MINMUM_VISIT_THRESHOLD) {
         throw new HttpException(
            "You muct complete more viits in order to requests more visits",
            HttpStatus.UNPROCESSABLE_ENTITY,
         );
      }
      const visit = new Visit();
      visit.id = visitId;
      visit.date = new Date(date);
      visit.minutes = 0;
      visit.status = VisitStatus.requested;
      visit.tasks = taskRecords;
      visit.userId = userId;
      visit.member = userRecord;

      try {
         await this.sequelize.transaction(async (t) => {
            visit.save();
            await Promise.all(taskRecords.map((task) => task.save()));
         });
         // If the execution reaches this line, the transaction has been committed successfully
         // `result` is whatever was returned from the transaction callback (the `user`, in this case)
         return new VisitDto(visit);
      } catch (error) {
         // If the execution reaches this line, an error occurred.
         // The transaction has already been rolled back automatically by Sequelize!
         throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   async fufillVisit(palId: string, fufillVisit: FufillVisitDto): Promise<VisitDto> {
      const { visitId, duration } = fufillVisit;
      const userRecord = await this.userService.getUserRecord(palId);
      if (!userRecord.role.includes(Role.pal)) {
         throw new HttpException(
            "User isn't a pal please update registration you must be a pal to fufill visits",
            HttpStatus.UNPROCESSABLE_ENTITY,
         );
      }
      const currentVist = await this.visitsRepository.findByPk(visitId, {
         include: [User],
      });
      if (userRecord.id === currentVist.userId) {
         throw new HttpException(
            "User can't compleete their own visit",
            HttpStatus.UNPROCESSABLE_ENTITY,
         );
      }
      currentVist.status = VisitStatus.completed;
      currentVist.minutes = duration;
      try {
         await this.minutesTransaction(currentVist, palId);
         currentVist.save();
         return new VisitDto(currentVist);
      } catch (err) {
         throw new HttpException(
            `Failed to complete visit fufillment for ${visitId}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   async minutesTransaction(currentVist: Visit, palId: string): Promise<User[]> {
      currentVist.member.balance -= currentVist.minutes;
      const pal = await this.userService.getUserRecord(palId);
      pal.balance = pal.balance + Math.round(currentVist.minutes * .85)
      return this.userService.accountTransaction(currentVist.member, pal);
   }


   async createTaskRecord(task: TaskDto, visitId: string): Promise<Task> {
      const taskRecord = new Task();
      taskRecord.title = task.title;
      taskRecord.id = uuid.v4();
      taskRecord.description = task.description;
      return taskRecord;
   }
}
