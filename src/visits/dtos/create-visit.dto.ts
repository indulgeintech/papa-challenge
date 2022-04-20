import {
    IsArray,
    IsDate,
    IsNumber,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Task } from '../entity';
import { TaskDto } from './task.dto';

export class CreateVisit {
    @ApiProperty({
        description: `The expected visit date`,
        example: 'Tue Aug 19 1975 23:15:30 GMT-0400 (Eastern Daylight Time)'
    })
    @IsString()
    readonly date: string;

    @ApiProperty({
        description: `The user's lastname`,
        example: 'hernandez'
    })
    @IsArray()
    readonly tasks: TaskDto[];
}