import * as vscode from 'vscode';

import { TasksRepository } from './tasksRepository';

export class TasksProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined> = new vscode.EventEmitter<vscode.TreeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined> = this._onDidChangeTreeData.event;

    constructor(private _tasksRepository: TasksRepository) {
    }

    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        if (element === undefined && this._tasksRepository.tasks.size > 0) {
            let tasksArray =  Array.from(this._tasksRepository.tasks);
            tasksArray.forEach(task => {
                task.collapsibleState = vscode.TreeItemCollapsibleState.None;
            });

            return tasksArray;
        }
        else {
            return Promise.resolve([]);
        }
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
}
