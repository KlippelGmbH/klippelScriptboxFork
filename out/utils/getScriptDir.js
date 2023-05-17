"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScriptDir = void 0;
const path_1 = require("path");
const os_1 = require("os");
const getScriptDir = () => (0, os_1.homedir)() + `${path_1.sep}.scriptbox${path_1.sep}`;
exports.getScriptDir = getScriptDir;
//# sourceMappingURL=getScriptDir.js.map