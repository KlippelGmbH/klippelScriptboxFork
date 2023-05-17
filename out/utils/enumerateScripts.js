"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumerateScripts = void 0;
const fs_1 = require("fs");
const getScriptDir_1 = require("./getScriptDir");
const isScript_1 = require("./isScript");
const enumerateScripts = (dir) => new Promise((resolve, reject) => (0, fs_1.readdir)(dir, (err, files) => {
    if (err && err.code === "ENOENT") {
        reject(new Error(`${(0, getScriptDir_1.getScriptDir)()} does not exist`));
    }
    else if (err) {
        reject(err);
    }
    else if (files && files.filter(isScript_1.isScript).length === 0) {
        reject(new Error(`${(0, getScriptDir_1.getScriptDir)()} contains no scripts`));
    }
    else {
        resolve(files.filter(isScript_1.isScript));
    }
}));
exports.enumerateScripts = enumerateScripts;
//# sourceMappingURL=enumerateScripts.js.map