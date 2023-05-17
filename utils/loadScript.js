"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadScript = void 0;
const loadScript = (path) => {
    try {
        delete require.cache[require.resolve(path)];
        return require(path);
    }
    catch (err) {
        throw new Error(`Error loading '${path}': ${err.message}`);
    }
};
exports.loadScript = loadScript;
//# sourceMappingURL=loadScript.js.map