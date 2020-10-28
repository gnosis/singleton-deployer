import { buildCreate2Address } from './address_utils'
import { toBN, toHexString } from './number_utils'
import { SingletonFactory, ProviderAdapter, Transaction } from './deployer';

export abstract class BaseSingletonFactory implements SingletonFactory {
    readonly provider: ProviderAdapter;
    abstract readonly address: string;
    abstract readonly deployer: string;
    abstract readonly deploymentTx: string;
    abstract readonly deploymentCosts: string;
    constructor(provider: ProviderAdapter) {
        this.provider = provider
    }
    abstract buildDeployData(bytecode: string, salt: string): Promise<string>;
    abstract simulateDeploy(tx: Transaction): Promise<string>;

    async ensureFactory(): Promise<void> {
        const account = await this.provider.account()
        const factoryDeployed = await this.provider.contractExists(this.address)
        if (factoryDeployed) {
            console.log("SingletonFactory already deployed at " + this.address)
        } else {
            const deployerFunds = toBN(await this.provider.balance(this.deployer))
            const deploymentFunds = toBN(this.deploymentCosts)
            const missingDeployerFunds = deploymentFunds.sub(deployerFunds);
            if (missingDeployerFunds.gtn(0)) {
                await this.provider.sendTransaction({
                    from: account,
                    to: this.deployer,
                    value: toHexString(missingDeployerFunds)
                })
            }
            await this.provider.sendRawTransaction(this.deploymentTx)
            console.log("Deployed SingletonFactory at " + this.address)
        }
    }

    calculateSingletonAddress(bytecode: string, salt: string): string {
        return buildCreate2Address(this.address, salt, bytecode)
    }

    async estimateDeploymentGas(tx: Transaction, expectedAddress: string): Promise<number> {
        let estimate = await this.provider.estimateGas(tx)
        let tries = 0
        let address = ""
        while (address.toLowerCase() !== expectedAddress.toLowerCase() && tries < 10) {
            // Increase the estimate by 25% every time (even initially, similar to truffle)
            estimate = Math.ceil(estimate * 1.25);
            tries++;
            try {
                address = await this.simulateDeploy({ ...tx, gas: estimate })
            } catch (e) { }
        }
        return estimate
    }

    async deploy(bytecode: string, salt: string, gasLimit?: number, gasPrice?: number): Promise<string> {
        const data = await this.buildDeployData(bytecode, salt)
        await this.ensureFactory()
        const tx = {
            to: this.address,
            value: 0,
            data: data
        }
        const gas = gasLimit || await this.estimateDeploymentGas(tx, this.calculateSingletonAddress(bytecode, salt))
        return await this.provider.sendTransaction({ ...tx, gas, gasPrice })
    }
}