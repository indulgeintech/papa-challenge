import {
    IsString,
    IsEmail,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: `The user's email`,
        example: 'papapal@gmail.com'
      })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        description: `The user's password min length 6`,
        example: 'password'
      })
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty({
        description: `The user's firstname`,
        example: 'frank'
      })
    @IsString()
    readonly firstName: string;

    @ApiProperty({
        description: `The user's lastname`,
        example: 'hernandez'
      })
    @IsString()
    readonly lastName: string;
}