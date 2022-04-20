import {
    IsNumber,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FufillVisitDto {
    @ApiProperty({
        description: `The visit's id`,
        example: '12345'
    })
    @IsString()
    readonly visitId: string;

    @ApiProperty({
        description: `The number of minutes the visit lasted`,
        example: 60
    })
    @IsNumber()
    readonly duration: number;
}