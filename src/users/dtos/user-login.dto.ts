import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../user.entity';
import { UserDto } from './user.dto';

export class UserLoginRequestDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly password: string;
}

export class UserLoginResponseDto extends UserDto {
    @ApiProperty()
    token: string;

    constructor(user: User, token?: string) {
        super(user);
        this.token = token;
    }
}