"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScript = void 0;
const constants_1 = require("../constants");
const isScript = (filename) => filename.endsWith(".js") && !filename.endsWith(constants_1.SCRATCH_FILENAME);
exports.isScript = isScript;
//# sourceMappingURL=isScript.js.map