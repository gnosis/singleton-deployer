// SPDX-License-Identifier: LMIT-only
pragma solidity >=0.7.0 <0.8.0;

contract TestSingleton {

    address public immutable deployer;
    constructor() {
        deployer = msg.sender;
    }
}