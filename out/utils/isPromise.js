"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = void 0;
const isPromise = (value) => typeof value === "object" &&
    "then" in value &&
    typeof value.then === "function";
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map