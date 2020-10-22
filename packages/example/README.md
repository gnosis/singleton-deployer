Singleton deployer example
==========================

Install
-------
### Install requirements with yarn:

```bash
yarn
// Setup env
cp .env.sample .env
```

### Build contracts

With docker:
```bash
docker-compose up
```

Without docker:
```bash
yarn compile
```

### Run all tests (requires Node version >=7 for `async/await`):

Running the tests with docker:

```bash
docker build -t singleton-deployer-example .
docker run singleton-deployer-example yarn test
```

If you want to run it without docker:

```bash
yarn compile
yarn test
```

In this case it is expected that the deployment check test fails.

### Deploy

Docker is used to ensure that always the same bytecode is generated.

Preparation:
- Set `INFURA_TOKEN` in `.env`
- Set `MNEMONIC` in `.env`

Deploying with docker (should always result in the same contract addresses):

```bash
./deploy.sh <network>
```

If you want to run it without docker (might result in different contract addresses):

```bash
yarn compile
yarn deploy <network>
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
