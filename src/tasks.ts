import * as vscode from 'vscode';

import { TreeItemCollapsibleState } from 'vscode';

export class Task extends vscode.TreeItem {
    constructor(
        public label: string,
        public args: string[],
        public command: string,
        public type: string,
    ) {
        super(label, TreeItemCollapsibleState.Collapsed);
        this.label = label;
        this.args = args;
        this.command = command;
        this.type = type;
    }
}
