import { SingletonFactory, ProviderAdapter, Transaction } from './deployer';
export declare abstract class BaseSingletonFactory implements SingletonFactory {
    readonly provider: ProviderAdapter;
    abstract readonly address: string;
    abstract readonly deployer: string;
    abstract readonly deploymentTx: string;
    abstract readonly deploymentCosts: number;
    constructor(provider: ProviderAdapter);
    abstract buildDeployData(bytecode: string, salt: string): Promise<string>;
    abstract simulateDeploy(tx: Transaction): Promise<string>;
    ensureFactory(): Promise<void>;
    calculateSingletonAddress(bytecode: string, salt: string): string;
    estimateDeploymentGas(tx: Transaction, expectedAddress: string): Promise<number>;
    deploy(bytecode: string, salt: string, gasLimit?: number): Promise<string>;
}
