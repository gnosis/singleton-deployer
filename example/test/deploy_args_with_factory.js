const TestSingletonArgs = artifacts.require("./TestSingletonArgs.sol")
const { EIP2470SingletonFactory } = require('@gnosis.pm/singleton-factory-deployer-eip2470');
const { Web3jsProvider } = require('@gnosis.pm/singleton-factory-deployer-web3js');
const { YulSingletonFactory } = require('@gnosis.pm/singleton-factory-deployer-yul');
const { TruffleSingletonDeployer } = require('@gnosis.pm/singleton-factory-deployer-truffle');

async function logGasUsage(subject, transactionHash) {
    let receipt = await web3.eth.getTransactionReceipt(transactionHash)
    console.log("    Gas costs for " + subject + ": " + receipt.gasUsed)
}

contract('TestSingletonArgs', () => {
    it('deploy with yarn factory + web3', async () => {
        const provider = new Web3jsProvider(web3)
        const factory = new YulSingletonFactory(provider)
        const deployer = new TruffleSingletonDeployer(factory, provider)
        const deploymentInfo = await deployer.deployWithArgs(TestSingletonArgs, ["Hello yarn"])
        await logGasUsage("TestSingleton deployment", deploymentInfo.transactionHash)
        assert.equal(TestSingletonArgs.address, deploymentInfo.contractAddress)
        const singleton = await TestSingletonArgs.at(deploymentInfo.contractAddress)
        assert.equal(await singleton.deployer(), factory.address)
        assert.equal(await singleton.greeting(), "Hello yarn")
    })

    it('deploy with eip2470 factory + web3', async () => {
        const provider = new Web3jsProvider(web3)
        const factory = new EIP2470SingletonFactory(provider)
        const deployer = new TruffleSingletonDeployer(factory, provider)
        const deploymentInfo = await deployer.deployWithArgs(TestSingletonArgs, ["Hello eip2470"])
        await logGasUsage("TestSingleton deployment", deploymentInfo.transactionHash)
        assert.equal(TestSingletonArgs.address, deploymentInfo.contractAddress)
        const singleton = await TestSingletonArgs.at(deploymentInfo.contractAddress)
        assert.equal(await singleton.deployer(), factory.address)
        assert.equal(await singleton.greeting(), "Hello eip2470")
    })
})
