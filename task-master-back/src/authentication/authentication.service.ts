import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/model/users.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
}
