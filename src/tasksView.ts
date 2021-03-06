import * as vscode from 'vscode';

import { TasksRepository } from './tasksRepository';
import { TasksProvider } from './tasksProvider';
import { Task } from './tasks';

export class TaskView {
    constructor(private tasksRepository: TasksRepository,
                private tasksProvider: TasksProvider) {
    }

    refreshTasks() {
        this.tasksRepository.read();
        this.tasksProvider._onDidChangeTreeData.fire({});
    }

    runTask(element: Task) {
        const shellCommand = `${element._command} ${element._args.join(' ')}`;

        const task = new vscode.Task(
            {
                type: 'shell',
                task: element.label
            },
            `running task: ${element.label}`,
            'make',
            new vscode.ShellExecution(shellCommand)
        );
        vscode.tasks.executeTask(task).then();
    }
}