import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/model/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [UsersService, AuthenticationService],
})
export class AuthenticationModule {}
