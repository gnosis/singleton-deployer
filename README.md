Singleton deployer
==================

Usage with truffle migrations
-----------------------------
```js
const UserContract = artifacts.require("./UserContract.sol")
const { TruffleSingletonDeployer } = require('@gnosis.pm/singleton-deployer-truffle');
await deployTruffleContract(web3, UserContract, contructorArg1, contructorArg2)
```

See tests in example package for more details.

Build
-----
### Install requirements with yarn:

```bash
yarn build
```

Security and Liability
----------------------
All contracts are WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

License
-------
All smart contracts are released under MIT.

Contributors
------------
- Richard Meissner ([rmeissner](https://github.com/rmeissner))
