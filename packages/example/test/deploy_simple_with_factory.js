const { logGasUsage } = require('./utils')
const TestSingleton = artifacts.require("./TestSingleton.sol")
const { EIP2470SingletonFactory } = require('@gnosis.pm/singleton-deployer-eip2470-factory');
const { Web3jsProvider } = require('@gnosis.pm/singleton-deployer-web3js-provider');
const { YulSingletonFactory } = require('@gnosis.pm/singleton-deployer-yul-factory');
const { TruffleSingletonDeployer } = require('@gnosis.pm/singleton-deployer-truffle');

contract('TestSingleton', () => {
    it('deploy with yarn factory + web3', async () => {
        const provider = new Web3jsProvider(web3)
        const factory = new YulSingletonFactory(provider)
        const deployer = new TruffleSingletonDeployer(factory, provider)
        const deploymentInfo = await deployer.deploy(TestSingleton)
        await logGasUsage("TestSingleton deployment", deploymentInfo.transactionHash)
        assert.equal(TestSingleton.address, deploymentInfo.contractAddress)
        const singleton = await TestSingleton.at(deploymentInfo.contractAddress)
        assert.equal(await singleton.deployer(), factory.address)
    })

    it('deploy with eip2470 factory + web3', async () => {
        const provider = new Web3jsProvider(web3)
        const factory = new EIP2470SingletonFactory(provider)
        const deployer = new TruffleSingletonDeployer(factory, provider)
        const deploymentInfo = await deployer.deploy(TestSingleton)
        await logGasUsage("TestSingleton deployment", deploymentInfo.transactionHash)
        assert.equal(TestSingleton.address, deploymentInfo.contractAddress)
        const singleton = await TestSingleton.at(deploymentInfo.contractAddress)
        assert.equal(await singleton.deployer(), factory.address)
    })
})
