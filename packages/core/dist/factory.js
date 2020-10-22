"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSingletonFactory = void 0;
var address_utils_1 = require("./address_utils");
var BaseSingletonFactory = /** @class */ (function () {
    function BaseSingletonFactory(provider) {
        this.provider = provider;
    }
    BaseSingletonFactory.prototype.ensureFactory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account, factoryDeployed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.account()];
                    case 1:
                        account = _a.sent();
                        return [4 /*yield*/, this.provider.contractExists(this.address)];
                    case 2:
                        factoryDeployed = _a.sent();
                        if (!factoryDeployed) return [3 /*break*/, 3];
                        console.log("SingletonFactory already deployed at " + this.address);
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.provider.sendTransaction({
                            from: account,
                            to: this.deployer,
                            value: this.deploymentCosts
                        })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.provider.sendRawTransaction(this.deploymentTx)];
                    case 5:
                        _a.sent();
                        console.log("Deployed SingletonFactory at " + this.address);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BaseSingletonFactory.prototype.calculateSingletonAddress = function (bytecode, salt) {
        return address_utils_1.buildCreate2Address(this.address, salt, bytecode);
    };
    BaseSingletonFactory.prototype.estimateDeploymentGas = function (tx, expectedAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var estimate, tries, address, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.provider.estimateGas(tx)];
                    case 1:
                        estimate = _a.sent();
                        tries = 0;
                        address = "";
                        _a.label = 2;
                    case 2:
                        if (!(address.toLowerCase() !== expectedAddress.toLowerCase() && tries < 10)) return [3 /*break*/, 7];
                        tries++;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.simulateDeploy(__assign(__assign({}, tx), { gas: estimate }))];
                    case 4:
                        address = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        estimate = Math.ceil(estimate * 1.2);
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, estimate];
                }
            });
        });
    };
    BaseSingletonFactory.prototype.deploy = function (bytecode, salt, gasLimit) {
        return __awaiter(this, void 0, void 0, function () {
            var data, tx, gas, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.buildDeployData(bytecode, salt)];
                    case 1:
                        data = _b.sent();
                        return [4 /*yield*/, this.ensureFactory()];
                    case 2:
                        _b.sent();
                        tx = {
                            to: this.address,
                            value: 0,
                            data: data
                        };
                        _a = gasLimit;
                        if (_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.estimateDeploymentGas(tx, this.calculateSingletonAddress(bytecode, salt))];
                    case 3:
                        _a = (_b.sent());
                        _b.label = 4;
                    case 4:
                        gas = _a;
                        return [4 /*yield*/, this.provider.sendTransaction(__assign(__assign({}, tx), { gas: gas }))];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return BaseSingletonFactory;
}());
exports.BaseSingletonFactory = BaseSingletonFactory;
//# sourceMappingURL=factory.js.map