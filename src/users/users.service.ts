import { Injectable, Inject, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { ConfigService } from '../config/config.service';
import { UserLoginRequestDto, UserLoginResponseDto } from './dtos/user-login.dto';
import { Jwt } from '../auth/jwt.model';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
    private readonly jwtPrivateKey: string;

    constructor(
        @Inject('UsersRepository')
        private readonly usersRepository: typeof User,
        @Inject('SEQUELIZE') 
        private readonly sequelize: Sequelize,
        private readonly configService: ConfigService,
    ) {
        this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
    }

    private async signToken(user: User) {
        const payload: Jwt = {
            email: user.email,
        };
        return sign(payload, this.jwtPrivateKey, {});
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

    async getUserRecord(id: string) {
        const userDB = await this.usersRepository.findByPk<User>(id);
        if (!userDB) {
            throw new HttpException(
                'User with given id not found',
                HttpStatus.NOT_FOUND,
            );
        }
        return userDB;
    }

    async getUserByEmail(email: string): Promise<User> {
        const userDB = await this.usersRepository.findOne<User>({
            where: { email },
        });
        return userDB;
    }

    async create(createUserDto: CreateUserDto): Promise<UserLoginResponseDto> {
        const user = new User();
        user.email = createUserDto.email.trim().toLowerCase();
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.role = createUserDto.role;
        user.balance = 120;
        //@TODO: refactor to seperate util
        try {
            const salt = await genSalt(10);
            user.password = await hash(createUserDto.password, salt);
        } catch (err) {
            Logger.error(err, '[User Create] error creating password hash on')
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const userDB = await user.save();
            // when registering then log user in automatically by returning a token
            const token = await this.signToken(userDB);
            return new UserLoginResponseDto(userDB, token);
        } catch (err) {
            if (err.original.constraint === 'user_email_key') {
                Logger.error(err, '[User Create] error user already exsits')
                throw new HttpException(
                    `User with email '${err.errors[0].value}' already exists`,
                    HttpStatus.CONFLICT,
                );
            }
            Logger.error(err, '[User Create] internal server error saving the user')
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(userLoginRequestDto: UserLoginRequestDto) {
        const email = userLoginRequestDto.email;
        const password = userLoginRequestDto.password;

        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const token = await this.signToken(user);
        return new UserLoginResponseDto(user, token);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        user.firstName = updateUserDto.firstName || user.firstName;
        user.lastName = updateUserDto.lastName || user.lastName;
        user.email = updateUserDto.email || user.email;
        user.password = updateUserDto.password || user.password;
        user.role = updateUserDto.role || user.role;
        user.balance = updateUserDto.balance || user.balance;

        try {
            const data = await user.save();
            return new UserDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //@todo move towards a user account service
    async accountTransaction(member: User, pal: User):Promise<User[]> {
        try {
            const result = await this.sequelize.transaction(async (t) => {
                member.save();
                pal.save();
                return [member, pal]
            });
            // If the execution reaches this line, the transaction has been committed successfully
            // `result` is whatever was returned from the transaction callback (the `user`, in this case)
            return result
        } catch (error) {
            // If the execution reaches this line, an error occurred.
            // The transaction has already been rolled back automatically by Sequelize!
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}