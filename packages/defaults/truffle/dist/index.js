"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.TruffleSingletonDeployer = exports.deployTruffleContract = exports.truffleDeployer = void 0;
var singleton_deployer_core_1 = require("@gnosis.pm/singleton-deployer-core");
var singleton_deployer_yul_factory_1 = require("@gnosis.pm/singleton-deployer-yul-factory");
var singleton_deployer_web3js_provider_1 = require("@gnosis.pm/singleton-deployer-web3js-provider");
exports.truffleDeployer = function (web3) {
    var provider = new singleton_deployer_web3js_provider_1.Web3jsProvider(web3);
    var factory = new singleton_deployer_yul_factory_1.YulSingletonFactory(provider);
    return new TruffleSingletonDeployer(factory, provider);
};
exports.deployTruffleContract = function (web3, artifact) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.truffleDeployer(web3).deployWithArgs(artifact, args)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
var TruffleSingletonDeployer = /** @class */ (function (_super) {
    __extends(TruffleSingletonDeployer, _super);
    function TruffleSingletonDeployer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TruffleSingletonDeployer.prototype.deployWithArgs = function (artifact, args, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var artifactName, deployTx, opts, deploymentInfo, contractAddress, transactionHash, newContract, addressOnArtifact;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        artifactName = artifact.contractName || "Artifact";
                        return [4 /*yield*/, (_c = artifact.new).request.apply(_c, args)];
                    case 1:
                        deployTx = _d.sent();
                        console.log((_a = artifact.class_defaults) === null || _a === void 0 ? void 0 : _a.gasPrice);
                        opts = __assign({ gasPrice: (_b = artifact.class_defaults) === null || _b === void 0 ? void 0 : _b.gasPrice }, options);
                        return [4 /*yield*/, this.deployContract(deployTx.data, opts)];
                    case 2:
                        deploymentInfo = _d.sent();
                        contractAddress = deploymentInfo.contractAddress, transactionHash = deploymentInfo.transactionHash, newContract = deploymentInfo.newContract;
                        if (newContract) {
                            console.log("Deployed " + artifactName + " at " + contractAddress);
                            artifact.address = contractAddress;
                            artifact.transactionHash = transactionHash;
                        }
                        else {
                            try {
                                addressOnArtifact = artifact.address;
                                if (addressOnArtifact !== contractAddress) {
                                    console.warn("Expected to find " + contractAddress + " set as " + artifactName + " address but instead found " + artifact.address + " so the address is being updated, but the transaction hash should be manually corrected");
                                }
                                else {
                                    console.log("Found " + artifactName + " at " + contractAddress);
                                }
                            }
                            catch (e) {
                                if (e.message.startsWith(artifactName + " has no network configuration for its current network id")) {
                                    console.warn("Expected to find " + contractAddress + " set as " + artifactName + " address but instead couldn't find an address, so the address is being updated, but the transaction hash should be manually added");
                                }
                                else {
                                    throw e;
                                }
                            }
                            artifact.address = contractAddress;
                        }
                        return [2 /*return*/, deploymentInfo];
                }
            });
        });
    };
    TruffleSingletonDeployer.prototype.deploy = function (artifact, options) {
        return this.deployWithArgs(artifact, [], options);
    };
    return TruffleSingletonDeployer;
}(singleton_deployer_core_1.SingletonDeployer));
exports.TruffleSingletonDeployer = TruffleSingletonDeployer;
//# sourceMappingURL=index.js.map