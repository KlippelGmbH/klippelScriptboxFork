"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureScriptDir = void 0;
const fs_1 = require("fs");
const ensureScriptDir = (scriptDir) => {
    try {
        (0, fs_1.mkdirSync)(scriptDir);
    }
    catch (err) {
        // Do nothing? The scriptDir must already exist
    }
};
exports.ensureScriptDir = ensureScriptDir;
//# sourceMappingURL=ensureScriptDir.js.map