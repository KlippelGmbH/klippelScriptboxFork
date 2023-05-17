"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeConsole = void 0;
const vscode = require("vscode");
const createLogger = (outputChannel, level) => (message, ...args) => {
    outputChannel.appendLine([level, message, ...args].join(" "));
};
const initializeConsole = () => {
    const outputChannel = vscode.window.createOutputChannel("ScriptBox");
    return outputChannel;
};
exports.initializeConsole = initializeConsole;
//# sourceMappingURL=initializeConsole.js.map