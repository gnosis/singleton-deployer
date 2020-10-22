import { buildCreate2Address } from './address_utils'
import { SingletonFactory, ProviderAdapter, Transaction } from './deployer';

export abstract class BaseSingletonFactory implements SingletonFactory {
    readonly provider: ProviderAdapter;
    abstract readonly address: string;
    abstract readonly deployer: string;
    abstract readonly deploymentTx: string;
    abstract readonly deploymentCosts: number;
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
            await this.provider.sendTransaction({
                from: account,
                to: this.deployer,
                value: this.deploymentCosts
            })
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
            tries++;
            try {
                address = await this.simulateDeploy({ ...tx, gas: estimate })
            } catch (e) { }
            estimate = Math.ceil(estimate * 1.2);
        }
        return estimate
    }

    async deploy(bytecode: string, salt: string, gasLimit?: number): Promise<string> {
        const data = await this.buildDeployData(bytecode, salt)
        await this.ensureFactory()
        const tx = {
            to: this.address,
            value: 0,
            data: data
        }
        const gas = gasLimit || await this.estimateDeploymentGas(tx, this.calculateSingletonAddress(bytecode, salt))
        return await this.provider.sendTransaction({ ...tx, gas })
    }
}