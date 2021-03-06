"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskView = void 0;
const vscode = require("vscode");
class TaskView {
    constructor(tasksRepository, tasksProvider) {
        this.tasksRepository = tasksRepository;
        this.tasksProvider = tasksProvider;
    }
    refreshTasks() {
        this.tasksRepository.read();
        this.tasksProvider._onDidChangeTreeData.fire({});
    }
    runTask(element) {
        const shellCommand = `${element._command} ${element._args.join(' ')}`;
        const task = new vscode.Task({
            type: 'shell',
            task: element.label
        }, `running task: ${element.label}`, 'make', new vscode.ShellExecution(shellCommand));
        vscode.tasks.executeTask(task).then();
    }
}
exports.TaskView = TaskView;
//# sourceMappingURL=tasksView.js.map