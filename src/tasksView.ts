import * as vscode from 'vscode';

import { TasksRepository } from './tasksRepository';
import { TasksProvider } from './tasksProvider';
import { Task } from './tasks';

export class TaskView {
    constructor(public tasksRepository: TasksRepository,
                public tasksProvider: TasksProvider) {
        let filePath = this.tasksProvider.tasksRepository.tasksFile;
        let fileWatcher = vscode.workspace.createFileSystemWatcher(filePath);
        fileWatcher.onDidChange(() => {
            this.refreshTasks();
        });
    }

    refreshTasks(): void {
        this.tasksRepository.read();
        this.tasksProvider._onDidChangeTreeData.fire();
    }

    runTask(element: Task) {
        const shellCommand = `${element.command} ${element.args.join(' ')}`;

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