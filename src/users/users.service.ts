import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { ConfigService } from '../config/config.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject('UsersRepository')
        private readonly usersRepository: typeof User,
        private readonly configService: ConfigService,
    ) {
    }

    async findAll() {
        const usersDB = await this.usersRepository.findAll<User>();
        return usersDB.map(user => new UserDto(user));
    }

    async getUser(id: string) {
        const userDB = await this.usersRepository.findByPk<User>(id);
        if (!userDB) {
            throw new HttpException(
                'User with given id not found',
                HttpStatus.NOT_FOUND,
            );
        }
        const userWire = new UserDto(userDB);
        return userWire;
    }

    async getUserByEmail(email: string):Promise<UserDto> {
        const userDB = await this.usersRepository.findOne<User>({
            where: { email },
        });
        const userWire = new UserDto(userDB);
        return userWire;
    }

    async create(createUserDto: CreateUserDto):Promise<UserDto> {
            const user = new User();
            user.email = createUserDto.email.trim().toLowerCase();
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.role = createUserDto.role;
        //@TODO: refactor to seperate util
        try{
            const salt = await genSalt(10);
            user.password = await hash(createUserDto.password, salt);
        } catch(err){
            Logger.error(err, '[User Create] error creating password hash on')
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const userDB = await user.save();
            const userWire = new UserDto(userDB);
            return userWire;
        } catch (err) {
            if (err.original.constraint === 'user_email_key') {
                Logger.error(err, '[User Create] error user already exsits')
                throw new HttpException(
                    `User with email '${err.errors[0].value}' already exists`,
                    HttpStatus.CONFLICT,
                );
            }
            Logger.error(err,'[User Create] internal server error saving the user')
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}