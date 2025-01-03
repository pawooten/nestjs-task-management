import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id: string) {
        return this.tasks.find((task) => task.id === id);
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        return this.tasks.filter((task) => {
            if (filterDto.status && task.status !== filterDto.status) {
                return false;
            }
            if (
                filterDto.search &&
                !task.title.includes(filterDto.search) &&
                !task.description.includes(filterDto.search)
            ) {
                return false;
            }
            return true;
        });
    }

    createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;
        const task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.Open,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        if (task) {
            task.status = status;
            return task;
        }
    }
}
