"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScratchFilename = void 0;
const constants_1 = require("../constants");
const getScriptDir_1 = require("./getScriptDir");
const getScratchFilename = () => `${(0, getScriptDir_1.getScriptDir)()}${constants_1.SCRATCH_FILENAME}`;
exports.getScratchFilename = getScratchFilename;
//# sourceMappingURL=getScratchFilename.js.map