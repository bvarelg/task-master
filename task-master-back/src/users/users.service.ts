import { Injectable } from '@nestjs/common';
import { User } from './model/users.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UserLoginDto } from './dto/user.login.dto';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  select(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async insert(dto: UserCreateDto): Promise<User> {
    return await this.userModel
      .create({
        name: dto.name,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async queryLogin(dto: UserLoginDto): Promise<User | any> {
    const user = await this.userModel.findOne({
      where: {
        email: dto.email,
        password: dto.password,
      },
      attributes: ['name', 'email', 'password'],
    });

    if (user === undefined && user === null) {
      return { message: 'Incorrect user' };
    } else {
      return user;
    }
  }
}
