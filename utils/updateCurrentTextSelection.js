"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCurrentTextSelection = void 0;
const vscode = require("vscode");
const lodash_1 = require("lodash");
const path = require("path");
const fs = require("fs");
const isScriptFunctionFileIntent_1 = require("./isScriptFunctionFileIntent");
// TODO: rename to processScriptFunctionResults
const updateCurrentTextSelection = (update, editor) => {
    if (!editor) {
        return;
    }
    const selection = editor.selection;
    if ((0, lodash_1.isArray)(update)) {
        update.forEach((item) => {
            if ((0, isScriptFunctionFileIntent_1.isScriptFunctionFileIntent)(item)) {
                const basePath = editor.document.uri.fsPath;
                const targetPath = path.normalize(path.join(path.dirname(basePath), item.filename));
                fs.writeFileSync(targetPath, item.content, "utf8");
            }
        });
    }
    else {
        // Replace the entire document's content
        if (selection.isEmpty) {
            editor.edit((builder) => {
                const position = selection.active;
                const range = new vscode.Range(position, position);
                builder.replace(range, text);
            });
        }
        // Replace only the selection
        else {
            editor.edit((builder) => {
                builder.replace(selection, update);
            });
        }
    }
};
exports.updateCurrentTextSelection = updateCurrentTextSelection;
//# sourceMappingURL=updateCurrentTextSelection.js.map