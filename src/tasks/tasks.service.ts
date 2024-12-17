import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id: string) {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(title: string, description: string) {
        const task = {
            id: Date.now().toString(),
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
