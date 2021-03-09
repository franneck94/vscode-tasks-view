import * as vscode from 'vscode';

import { TasksRepository } from './tasksRepository';

export class TasksProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    public _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | null> = new vscode
        .EventEmitter<vscode.TreeItem | null>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | null> = this
      ._onDidChangeTreeData.event;

    constructor(public tasksRepository: TasksRepository) {
    }

    refresh(): void {
        // @ts-ignore
        this.onDidChangeTreeData.fire();
        this.getChildren();
    }

    getChildren(element?: vscode.TreeItem | undefined): vscode.ProviderResult<vscode.TreeItem[]> {
        if (element === undefined && this.tasksRepository.tasks.length > 0) {
            let tasksArray =  Array.from(this.tasksRepository.tasks);
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
