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
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs_1 = require("fs");
const path_1 = require("path");
const dotenv = require("dotenv");
const getScriptDir_1 = require("./utils/getScriptDir");
const constants_1 = require("./constants");
const getCurrentTextSelection_1 = require("./utils/getCurrentTextSelection");
const ensureScriptDir_1 = require("./utils/ensureScriptDir");
const getScratchFilename_1 = require("./utils/getScratchFilename");
const createQuickPickItemsForScripts_1 = require("./utils/createQuickPickItemsForScripts");
const evaluateScratch_1 = require("./utils/evaluateScratch");
const enumerateScripts_1 = require("./utils/enumerateScripts");
const openScriptForEditing_1 = require("./utils/openScriptForEditing");
const initializeConsole_1 = require("./utils/initializeConsole");
const script_1 = require("./templates/script");
const scratch_1 = require("./templates/scratch");
const executeScript_1 = require("./utils/executeScript");
const loadScript_1 = require("./utils/loadScript");
// Load ~/.scriptbox/.env file
dotenv.config({ path: (0, getScriptDir_1.getScriptDir)() + ".env" });
function activate(context) {
    const outputChannel = (0, initializeConsole_1.initializeConsole)();
    (0, ensureScriptDir_1.ensureScriptDir)((0, getScriptDir_1.getScriptDir)());
    context.subscriptions.push(vscode.commands.registerCommand("scriptbox.createScript", () => __awaiter(this, void 0, void 0, function* () {
        try {
            vscode.window
                .showInputBox({
                placeHolder: "Script Name.js",
            })
                .then((scriptName) => {
                const newScriptPath = (0, getScriptDir_1.getScriptDir)() + scriptName + ((0, path_1.extname)(scriptName) || ".js");
                (0, fs_1.writeFileSync)(newScriptPath, script_1.SCRIPT_TEMPLATE, "UTF-8");
                (0, openScriptForEditing_1.openScriptForEditing)(newScriptPath);
            });
        }
        catch (err) {
            vscode.window.showErrorMessage(err.message);
        }
    })));
    context.subscriptions.push(vscode.commands.registerCommand("scriptbox.editScript", () => __awaiter(this, void 0, void 0, function* () {
        try {
            const scripts = yield (0, enumerateScripts_1.enumerateScripts)((0, getScriptDir_1.getScriptDir)());
            const scriptItems = (0, createQuickPickItemsForScripts_1.createQuickPickItemsForScripts)(scripts);
            const pickedScript = yield vscode.window.showQuickPick(scriptItems);
            if (pickedScript) {
                const pickedScriptPath = (0, getScriptDir_1.getScriptDir)() + pickedScript.script;
                (0, openScriptForEditing_1.openScriptForEditing)(pickedScriptPath);
            }
        }
        catch (err) {
            vscode.window.showErrorMessage(err.message);
        }
    })));
    context.subscriptions.push(vscode.commands.registerCommand("scriptbox.runScript", (pickedScript) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!pickedScript) {
                const scripts = yield (0, enumerateScripts_1.enumerateScripts)((0, getScriptDir_1.getScriptDir)());
                const scriptItems = (0, createQuickPickItemsForScripts_1.createQuickPickItemsForScripts)(scripts);
                const pickedScriptItem = yield vscode.window.showQuickPick(scriptItems);
                pickedScript = pickedScriptItem === null || pickedScriptItem === void 0 ? void 0 : pickedScriptItem.script;
            }
            if (pickedScript) {
                const pickedScriptPath = (0, getScriptDir_1.getScriptDir)() + pickedScript;
                const module = (0, loadScript_1.loadScript)(pickedScriptPath);
                (0, executeScript_1.executeScript)(module, pickedScript);
            }
        }
        catch (err) {
            vscode.window.showErrorMessage(err.message);
        }
    })));
    context.subscriptions.push(vscode.commands.registerCommand("scriptbox.runSelection", () => __awaiter(this, void 0, void 0, function* () {
        try {
            const selection = (0, getCurrentTextSelection_1.getCurrentTextSelection)(vscode.window.activeTextEditor);
            const result = eval(selection);
            console.log(`Result`, result);
        }
        catch (err) {
            vscode.window.showErrorMessage(`Evaluation error: ${err.message}`);
            console.error(err);
        }
    })));
    context.subscriptions.push(vscode.commands.registerCommand("scriptbox.openScratch", () => __awaiter(this, void 0, void 0, function* () {
        const filename = `${(0, getScriptDir_1.getScriptDir)()}${constants_1.SCRATCH_FILENAME}`;
        if (!(0, fs_1.existsSync)(filename)) {
            (0, fs_1.writeFileSync)(filename, scratch_1.SCRATCH_TEMPLATE, "UTF-8");
        }
        (0, openScriptForEditing_1.openScriptForEditing)(filename);
    })));
    // Re-evaluate scratch file on change
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((e) => {
        const scratchFilename = (0, getScratchFilename_1.getScratchFilename)();
        const didScratchChange = e.document.fileName.toLowerCase() === scratchFilename.toLowerCase();
        if (didScratchChange) {
            const code = e.document.getText();
            (0, evaluateScratch_1.evaluateScratch)(outputChannel, code);
        }
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map