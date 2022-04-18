import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('')
    @ApiOkResponse({ type: UserDto })
    register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserDto> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOkResponse({ type: [UserDto] })
    findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @Get('/:id')
    @ApiOkResponse({ type: UserDto })
    findById(@Req() request): Promise<UserDto> {
        return this.usersService.getUser(request.params.id);
    }

    @Get('/email/:email')
    @ApiOkResponse({ type: UserDto })
    findByEmail(@Req() request): Promise<UserDto> {
        return this.usersService.getUser(request.params.email);
    }
}
