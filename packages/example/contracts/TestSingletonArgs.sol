// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.8.0;

contract TestSingletonArgs {

    address public immutable deployer;
    string public greeting;
    constructor(string memory _greeting) {
        deployer = msg.sender;
        greeting = _greeting;
    }
}