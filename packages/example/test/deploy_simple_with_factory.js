const { logGasUsage } = require('./utils')
const TestSingleton = artifacts.require("./TestSingleton.sol")
const { EIP2470SingletonFactory } = require('@gnosis.pm/singleton-deployer-eip2470-factory');
const { Web3jsProvider } = require('@gnosis.pm/singleton-deployer-web3js-provider');
const { YulSingletonFactory } = require('@gnosis.pm/singleton-deployer-yul-factory');
const { TruffleSingletonDeployer } = require('@gnosis.pm/singleton-deployer-truffle');

contract('TestSingleton', (accounts) => {
    it('deploy with yul factory + web3', async () => {
        const provider = new Web3jsProvider(web3)
        const factory = new YulSingletonFactory(provider)
        const deployer = new TruffleSingletonDeployer(factory, provider)

        await web3.eth.sendTransaction({
            to: factory.deployer,
            value: factory.deploymentCosts,
            from: accounts[9]
        })

        const accountBalance = await web3.eth.getBalance(accounts[0])
        const deploymentInfo = await deployer.deploy(TestSingleton)

        let receipt = await web3.eth.getTransactionReceipt(deploymentInfo.transactionHash)
        let tx = await web3.eth.getTransaction(deploymentInfo.transactionHash)
        const expectedBalance = accountBalance - (receipt.gasUsed * tx.gasPrice)
        assert.equal(await web3.eth.getBalance(accounts[0]), expectedBalance)

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
