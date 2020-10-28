import { BaseSingletonFactory, ProviderAdapter, Transaction } from '@gnosis.pm/singleton-deployer-core';
export declare class EIP2470SingletonFactory extends BaseSingletonFactory {
    readonly address: string;
    readonly deployer: string;
    readonly deploymentTx: string;
    readonly deploymentCosts: string;
    readonly factoryAbiString = "deploy(bytes,bytes32):(address)";
    constructor(provider: ProviderAdapter);
    buildDeployData(bytecode: string, salt: string): Promise<string>;
    simulateDeploy(tx: Transaction): Promise<string>;
}
