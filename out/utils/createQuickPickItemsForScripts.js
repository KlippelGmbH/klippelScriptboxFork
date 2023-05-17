"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuickPickItemsForScripts = void 0;
const createQuickPickItemsForScripts = (scripts) => scripts.map((script) => ({
    script,
    label: script,
    description: `Execute '${script}' on the selected text`,
}));
exports.createQuickPickItemsForScripts = createQuickPickItemsForScripts;
//# sourceMappingURL=createQuickPickItemsForScripts.js.map