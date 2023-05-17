"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateScratch = void 0;
const vm = require("vm");
const _ = require("lodash");
exports.evaluateScratch = _.debounce((outputChannel, code) => {
    try {
        const ctx = vm.createContext({
            // This is where default imports for the scratch REPL go ...
            _,
        });
        outputChannel.clear();
        const result = vm.runInContext(code, ctx);
        outputChannel.show(true);
        console.log(JSON.stringify(result, null, "  "));
    }
    catch (err) {
        outputChannel.appendLine(`Failed to execute script ${err.message}`);
    }
}, 300);
//# sourceMappingURL=evaluateScratch.js.map