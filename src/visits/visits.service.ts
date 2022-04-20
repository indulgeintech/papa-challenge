import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateVisit } from './dtos/create-visit.dto';
import { TaskDto } from './dtos/task.dto';
import { VisitDto, VisitStatus } from './dtos/visit.dto';
import { Task } from './entity';
import { Visit } from './entity/visit.entity';

@Injectable()
export class VisitsService {
   constructor(
      @Inject('VisitsRepository')
      private readonly visitsRepository: typeof Visit,
      private readonly userService: UsersService,
  ) {

  }
   async createVisit(userId: string, createVisit:CreateVisit):Promise<VisitDto>{
      const { date, minutes, tasks } = createVisit;
      const taskRecords = await Promise.all(tasks.map((task)=> this.createTaskRecord(task)));
      const userRecord = await this.userService.getUserRecord(userId);
      if(userRecord.balance < minutes){
         throw new HttpException(
            "User doesn't have the appropiate balance to create the visit",
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const visit = new Visit();
      visit.date = new Date(date); 
      visit.minutes = minutes;
      visit.status = VisitStatus.requested;
      visit.tasks = taskRecords
      visit.userId = userId;
      visit.member = userRecord;
      return new VisitDto(visit);
   } 



   async createTaskRecord(task:TaskDto):Promise<Task>{
      const taskRecord = new Task();
      taskRecord.title = task.title; 
      taskRecord.id = task.id;
      taskRecord.description = task.description;
      return taskRecord.save()
   }
}
