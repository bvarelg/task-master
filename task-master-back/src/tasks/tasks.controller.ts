import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './models/task.entity';
import { taskCreateDto } from './dto/task.create.dto';
import { TaskUpdateDto } from './dto/task.update.dto';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  async getTask(): Promise<Task[]> {
    return await this.service.getAllTask();
  }

  @Post()
  async createTask(@Body() dto: taskCreateDto): Promise<Task> {
    return await this.service.createTask(dto);
  }

  @Get('/:id')
  async getTaskForId(@Param() params: any): Promise<Task> {
    return await this.service.getAllTaskForId(params.id);
  }

  @Put('/:id')
  async updateTask(
    @Param() params: any,
    @Body() dto: TaskUpdateDto,
  ): Promise<Task> {
    return await this.service.updateTask(params.id, dto);
  }

  @Delete('/:id')
  async deleteTaskRoute(@Param() params: any): Promise<number> {
    return await this.service.deleteTask(params.id);
  }
}
