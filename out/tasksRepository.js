"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const tasks_1 = require("./tasks");
const utils_1 = require("./utils");
class TasksRepository {
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
        this.tasksFile = "";
        this.tasks = new Set();
        this.tasksFile = path.join(workspaceRoot.fsPath, '.vscode', 'tasks.json');
        if (!utils_1.pathExists(this.tasksFile)) {
            return;
        }
        this.read();
    }
    read() {
        this.tasks.clear();
        if (!utils_1.pathExists(this.tasksFile)) {
            return;
        }
        let configJson;
        try {
            configJson = JSON.parse(fs.readFileSync(this.tasksFile, 'utf-8'));
        }
        catch (err) {
            vscode.window.showErrorMessage('The settings.json file cannot be read!');
            return;
        }
        if (!configJson.tasks) {
            return;
        }
        for (let taskJson of configJson.tasks) {
            if (taskJson.type !== 'shell') {
                return;
            }
            const task = new tasks_1.Task(taskJson.label, taskJson.args, taskJson.command, taskJson.type);
            this.tasks.add(task);
        }
        ;
    }
    getTaskByLabel(label) {
        return Array.from(this.tasks).find(task => task.label === label);
    }
}
exports.TasksRepository = TasksRepository;
//# sourceMappingURL=tasksRepository.js.map