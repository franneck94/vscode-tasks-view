"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksProvider = void 0;
const vscode = require("vscode");
class TasksProvider {
    constructor(_tasksRepository) {
        this._tasksRepository = _tasksRepository;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    getChildren(element) {
        if (element === undefined && this._tasksRepository.tasks.size > 0) {
            let tasksArray = Array.from(this._tasksRepository.tasks);
            tasksArray.forEach(task => {
                task.collapsibleState = vscode.TreeItemCollapsibleState.None;
            });
            return tasksArray;
        }
        else {
            return Promise.resolve([]);
        }
    }
    getTreeItem(element) {
        return element;
    }
}
exports.TasksProvider = TasksProvider;
//# sourceMappingURL=tasksProvider.js.map