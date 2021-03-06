import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { Task } from "./tasks";
import { pathExists } from './utils';

export class TasksRepository {

    private tasksFile: string = "";
    tasks: Set<Task> = new Set();

    constructor(private workspaceRoot: vscode.Uri) {
        this.tasksFile = path.join(workspaceRoot.fsPath, '.vscode', 'tasks.json');
        if (!pathExists(this.tasksFile)) {
            return;
        }
        this.read();
    }

    read() {
        this.tasks.clear();
        if (!pathExists(this.tasksFile)) {
            return;
        }

        let configJson;
        try {
            configJson = JSON.parse(fs.readFileSync(this.tasksFile, 'utf-8'));
        } catch (err) {
            vscode.window.showErrorMessage('The settings.json file cannot be read!');
            return;
        }

        if (!configJson.tasks) { return; }

        for (let taskJson of configJson.tasks) {
            if (taskJson.type !== 'shell') { return; }
            const task = new Task(taskJson.label, taskJson.args, taskJson.command, taskJson.type);
            this.tasks.add(task);
        };
    }

    getTaskByLabel(label: string): Task | undefined {
        return Array.from(this.tasks).find(task => task.label === label);
    }
}
