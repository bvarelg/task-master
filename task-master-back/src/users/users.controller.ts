import { User } from './model/users.entity';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/user.login.dto';
import { UserCreateDto } from './dto/user.create.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  allUsers() {
    return this.service.select();
  }

  @Post()
  createUser(@Body() dto: UserCreateDto) {
    return this.service.insert(dto);
  }

  @Post('/login')
  login(@Body() login: UserLoginDto): Promise<User | any> {
    return this.service.queryLogin(login).catch((error) => {
      console.log(error);
    });
  }
}
