"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const tasksView_1 = require("./tasksView");
const tasksRepository_1 = require("./tasksRepository");
const tasksProvider_1 = require("./tasksProvider");
function activate(context) {
    const workspace = vscode.workspace.workspaceFolders;
    if (!workspace || workspace.length > 1) {
        ;
    }
    else {
        initWorkspace(context, workspace[0].uri);
    }
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
function initWorkspace(context, workspaceUri) {
    const tasksRepository = new tasksRepository_1.TasksRepository(workspaceUri);
    const tasksProvider = new tasksProvider_1.TasksProvider(tasksRepository);
    const taskView = new tasksView_1.TaskView(tasksRepository, tasksProvider);
    const treeProvider = vscode.window.registerTreeDataProvider('TasksView', tasksProvider);
    const commandRefreshTasks = vscode.commands.registerCommand('TasksView.refreshTasks', () => {
        taskView.refreshTasks();
    });
    const commandRunTask = vscode.commands.registerCommand('TasksView.runTask', (element) => {
        taskView.runTask(element);
    });
    context.subscriptions.push(treeProvider);
    context.subscriptions.push(commandRefreshTasks);
    context.subscriptions.push(commandRunTask);
}
//# sourceMappingURL=extension.js.map