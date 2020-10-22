import { BaseSingletonFactory, ProviderAdapter, Transaction } from '@gnosis.pm/singleton-factory-deployer-core'

export class YulSingletonFactory extends BaseSingletonFactory {

    readonly address: string = "0x7A0D94F55792C434d74a40883C6ed8545E406D12"
    readonly deployer: string = "0x4c8D290a1B368ac4728d83a9e8321fC3af2b39b1";
    readonly deploymentTx: string = "0xf87e8085174876e800830186a08080ad601f80600e600039806000f350fe60003681823780368234f58015156014578182fd5b80825250506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222";
    readonly deploymentCosts: number = 100_000 * 100_000_000_000; // gas limit * gas price (100 gwei)

    constructor(provider: ProviderAdapter) {
        super(provider)
    }

    calculateSingletonAddress(bytecode: string, salt: string): string {
        if (salt !== "0x") throw new Error("This factory doesn't support a custom salt")
        return super.calculateSingletonAddress(bytecode, salt)
    }
    
    async buildDeployData(bytecode: string, salt: string): Promise<string> {
        if (salt !== "0x") throw new Error("This factory doesn't support a custom salt")
        return bytecode
    }
    
    async simulateDeploy(tx: Transaction): Promise<string> {
        return await this.provider.call(tx);
    }
}