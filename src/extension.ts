import * as vscode from 'vscode';

import { TaskView } from './tasksView';
import { TasksRepository } from './tasksRepository';
import { TasksProvider } from './tasksProvider';
import { Task } from './tasks';

export function activate(context: vscode.ExtensionContext) {
    const workspace = vscode.workspace.workspaceFolders;

    if (!workspace || workspace.length > 1) {
        ;
    } else {
        initWorkspace(context, workspace[0].uri);
    }
}

export function deactivate() {
}

function initWorkspace(context: vscode.ExtensionContext, workspaceUri: vscode.Uri) {
    const tasksRepository = new TasksRepository(workspaceUri);
    const tasksProvider = new TasksProvider(tasksRepository);
    const taskView = new TaskView(tasksRepository, tasksProvider);

    const treeProvider = vscode.window.registerTreeDataProvider('TasksView', tasksProvider);
    const commandRefreshTasks = vscode.commands.registerCommand('TasksView.refreshTasks', () => {
        taskView.refreshTasks();
    });
    const commandRunTask = vscode.commands.registerCommand('TasksView.runTask', (element: Task) => {
        taskView.runTask(element);
    });

    context.subscriptions.push(treeProvider);
    context.subscriptions.push(commandRefreshTasks);
    context.subscriptions.push(commandRunTask);
}
