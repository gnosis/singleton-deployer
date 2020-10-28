"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHexString = exports.toBN = void 0;
var ethjs_util_1 = require("ethjs-util");
var ethereumjs_util_1 = require("ethereumjs-util");
exports.toBN = function (value) {
    return new ethereumjs_util_1.BN(ethjs_util_1.stripHexPrefix(value), ethjs_util_1.isHexPrefixed(value) ? 'hex' : 10);
};
exports.toHexString = function (bn) {
    return ethereumjs_util_1.addHexPrefix(bn.toString('hex'));
};
//# sourceMappingURL=number_utils.js.map