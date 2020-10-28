export interface SingletonFactory {
    calculateSingletonAddress(bytecode: string, salt: string): string;
    deploy(bytecode: string, salt: string, gasLimit?: number, gasPrice?: number): Promise<string>;
}
export interface Transaction {
    from?: string;
    to: string;
    value: string | number;
    data?: string;
    gas?: number;
    gasPrice?: number;
}
export interface ProviderAdapter {
    account(): Promise<string>;
    contractExists(address: string): Promise<boolean>;
    call(tx: Transaction): Promise<string>;
    balance(address: string): Promise<string>;
    estimateGas(tx: Transaction): Promise<number>;
    sendTransaction(tx: Transaction): Promise<string>;
    sendRawTransaction(rawTx: string): Promise<string>;
}
export interface DeployOptions {
    salt?: string;
    gasLimit?: number;
    gasPrice?: number;
}
export interface DeploymentInfo {
    transactionHash?: string;
    contractAddress: string;
    newContract: boolean;
}
export declare class SingletonDeployer {
    readonly factory: SingletonFactory;
    readonly provider: ProviderAdapter;
    constructor(factory: SingletonFactory, provider: ProviderAdapter);
    deployContract(bytecode: string, options?: DeployOptions): Promise<DeploymentInfo>;
}
