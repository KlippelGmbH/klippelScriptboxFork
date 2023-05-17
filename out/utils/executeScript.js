"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeScript = void 0;
const vscode = require("vscode");
const getCurrentTextSelection_1 = require("./getCurrentTextSelection");
const isPromise_1 = require("./isPromise");
const shouldUpdateCurrentTextSelection_1 = require("./shouldUpdateCurrentTextSelection");
const updateCurrentTextSelection_1 = require("./updateCurrentTextSelection");
const executeScript = (module, pickedScript) => {
    const context = vscode;
    const targetEditor = vscode.window.activeTextEditor;
    const args = [(0, getCurrentTextSelection_1.getCurrentTextSelection)(targetEditor)];
    const transformed = module.apply(context, args);
    if ((0, isPromise_1.isPromise)(transformed)) {
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Running script ${pickedScript}`,
            cancellable: false,
        }, () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield transformed;
                if ((0, shouldUpdateCurrentTextSelection_1.shouldUpdateCurrentTextSelection)(result)) {
                    (0, updateCurrentTextSelection_1.updateCurrentTextSelection)(result, targetEditor);
                }
            }
            catch (e) {
                vscode.window.showErrorMessage(e.message);
            }
        }));
    }
    else {
        if ((0, shouldUpdateCurrentTextSelection_1.shouldUpdateCurrentTextSelection)(transformed)) {
            (0, updateCurrentTextSelection_1.updateCurrentTextSelection)(transformed, targetEditor);
        }
    }
};
exports.executeScript = executeScript;
//# sourceMappingURL=executeScript.js.map