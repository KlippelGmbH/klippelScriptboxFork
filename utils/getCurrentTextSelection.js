"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTextSelection = void 0;
const getCurrentTextSelection = (editor) => {
    if (!editor) {
        return;
    }
    const selection = editor.selection;
    if (selection.isEmpty) {
        return "";
    }
    return editor.document.getText(selection);
};
exports.getCurrentTextSelection = getCurrentTextSelection;
//# sourceMappingURL=getCurrentTextSelection.js.map