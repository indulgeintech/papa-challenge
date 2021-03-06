import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsEmail, MinLength, IsEnum, IsNumber } from "class-validator";
import { Role } from "./user.dto";

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly firstName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    readonly lastName?: string;

    @ApiProperty({
        description: `The user's email`,
        example: 'papapal@gmail.com'
      })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
      description: `user's balance in time mins`,
      example: '60mins',
    })
    @IsNumber()
    readonly balance: number;

    @ApiProperty({
        description: `The user's password min length 6`,
        example: 'password'
      })
    @IsString()
    @MinLength(6)
    readonly password: string;

    @ApiProperty()
    @IsEnum(Role, { each: true })
    readonly role: Role[];
}