import { BaseSingletonFactory, ProviderAdapter, Transaction } from '@gnosis.pm/singleton-deployer-core';
export declare class YulSingletonFactory extends BaseSingletonFactory {
    readonly address: string;
    readonly deployer: string;
    readonly deploymentTx: string;
    readonly deploymentCosts: number;
    constructor(provider: ProviderAdapter);
    calculateSingletonAddress(bytecode: string, salt: string): string;
    buildDeployData(bytecode: string, salt: string): Promise<string>;
    simulateDeploy(tx: Transaction): Promise<string>;
}
