"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCreate2Address = void 0;
var ethereumjs_abi_1 = require("ethereumjs-abi");
var ethereumjs_util_1 = require("ethereumjs-util");
exports.buildCreate2Address = function (deployer, salt, bytecode) {
    var addressString = ethereumjs_abi_1.soliditySHA3(['bytes1', 'address', 'bytes32', 'bytes32'], ["0xff", deployer, salt, ethereumjs_util_1.keccak256(bytecode)]).toString('hex');
    return ethereumjs_util_1.toChecksumAddress("0x" + addressString.slice(-40));
};
//# sourceMappingURL=address_utils.js.map