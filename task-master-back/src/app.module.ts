import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthenticationModule } from './authentication/authentication.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootpass',
      database: 'task-master',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthenticationModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
