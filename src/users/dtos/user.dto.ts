import { User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: `user id uuidv4`,
        example: 'f15a0612-91de-4212-bd59-1a615516eee3',
      })
    id: string;

    @ApiProperty({
        description: `user's email`,
        example: 'papapal@gmail.com',
      })
    readonly email: string;

    @ApiProperty({
        description: `user's first name`,
        example: 'frank',
      })
    readonly firstName: string;

    @ApiProperty({
        description: `user's last name`,
        example: 'hernandez',
      })
    readonly lastName: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
    }
}