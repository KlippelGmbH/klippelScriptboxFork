"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openScriptForEditing = void 0;
const vscode = require("vscode");
const openScriptForEditing = (scriptPath) => {
    vscode.workspace.openTextDocument(scriptPath).then((document) => vscode.window.showTextDocument(document, vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : 1), (err) => {
        console.error(err);
    });
};
exports.openScriptForEditing = openScriptForEditing;
//# sourceMappingURL=openScriptForEditing.js.map