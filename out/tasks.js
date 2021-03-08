"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const vscode = require("vscode");
const vscode_1 = require("vscode");
class Task extends vscode.TreeItem {
    constructor(label, args, command, type) {
        super(label, vscode_1.TreeItemCollapsibleState.Collapsed);
        this.label = label;
        this.args = args;
        this.command = command;
        this.type = type;
        this.label = label;
        this.args = args;
        this.command = command;
        this.type = type;
    }
}
exports.Task = Task;
//# sourceMappingURL=tasks.js.map