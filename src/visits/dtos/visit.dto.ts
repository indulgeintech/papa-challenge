import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum } from 'class-validator';
import { Visit } from '../entity';

export enum VisitStatus {
    requested = 'requested',
    completed = 'completed'
}

export class VisitDto {
    @ApiProperty({
        description: `visit id uuidv4`,
        example: 'f15a0612-91de-4212-bd59-1a615516eee3',
    })
    id: string;

    @ApiProperty({
        description: `visit's date`,
        example: '01/02/2020',
    })
    readonly date: Date;

    @ApiProperty({
        description: `visit's minutes`,
        example: '30',
    })
    readonly minutes: number;

    @ApiProperty({
        description: `visit's last name`,
        example: 'hernandez',
    })
    readonly lastName: string;

    @ApiProperty()
    @IsEnum(VisitStatus)
    readonly status: VisitStatus;

    @ApiProperty({
        description: `visit's tasks`,
        example: [{
        }],
    })
    @IsArray()
    @Type(()=> Task)
    readonly task: Task[];

    constructor(visit: Visit) {
        this.id = visit.id;
        this.task = visit.tasks;
        this.date = visit.date;
        this.status = visit.status;
    }
}