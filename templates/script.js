"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCRIPT_TEMPLATE = void 0;
exports.SCRIPT_TEMPLATE = `
// This function can be async; a busy indicator will show in VS Code
module.exports = (selection) => {
  // selection is a string containing:
  // 1. the current text selection
  // 2. pates changes to empty string on cursor Position
  return selection;
};
`.trim();
//# sourceMappingURL=script.js.map