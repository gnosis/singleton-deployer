Singleton Deployer - Truffle
============================

Usage
-----
### Install with yarn:

```bash
yarn add @gnosis.pm/singleton-deployer-truffle
```

### Example migration
```js
const { deployTruffleContract } = require('@gnosis.pm/singleton-deployer-truffle');
const UserContract = artifacts.require("UserContract");

module.exports = function(deployer) {
  deployer.then(async () => {
    await deployTruffleContract(web3, UserContract, contructorArg1, contructorArg2);
  })
};
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
