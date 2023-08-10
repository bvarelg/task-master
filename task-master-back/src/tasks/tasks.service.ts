import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './models/task.entity';
import { taskCreateDto } from './dto/task.create.dto';
import { TaskUpdateDto } from './dto/task.update.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  async getAllTask(): Promise<Task[]> {
    return await this.taskModel.findAll();
  }

  async getAllTaskForId(_id: number): Promise<Task> {
    return await this.taskModel.findOne({
      where: {
        id: _id,
      },
    });
  }

  async createTask(dto: taskCreateDto): Promise<Task> {
    return await this.taskModel.create({
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      datetime: dto.datetime,
    });
  }

  async updateTask(_id: number, dto: TaskUpdateDto): Promise<Task | any> {
    return await this.taskModel
      .update(
        {
          title: dto.title,
          description: dto.description,
          priority: dto.priority,
          datetime: dto.datetime,
        },
        {
          where: { id: _id },
        },
      )
      .then((response) => response)
      .catch(() => {
        return { message_error: 'NOT UPDATE TASK' };
      });
  }

  async deleteTask(_id: number): Promise<number> {
    return await this.taskModel.destroy({
      where: {
        id: _id,
      },
    });
  }
}
