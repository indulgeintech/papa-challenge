import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { Task } from '../entity';

export enum Role {
  member = 'member',
  pal = 'pal'
}
export class TaskDto {
  @ApiProperty({
    description: `user id uuidv4`,
    example: 'f15a0612-91de-4212-bd59-1a615516eee3',
  })
  id: string;

  @ApiProperty({
    description: `task title `,
    example: 'help with groceries',
  })
  readonly description: string;

  @ApiProperty({
    description: `task description`,
    example: 'member must drive pal to store and back assist with loading car',
  })
  readonly title: string;

  constructor(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
  }
}