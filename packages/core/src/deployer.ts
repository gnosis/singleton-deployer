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

export class SingletonDeployer {
    readonly factory: SingletonFactory;
    readonly provider: ProviderAdapter;
    constructor(factory: SingletonFactory, provider: ProviderAdapter) {
        this.factory = factory
        this.provider = provider
    }
    async deployContract(bytecode: string, options?: DeployOptions): Promise<DeploymentInfo> {
        const opts = options || {};
        const deploymentSalt = opts.salt || "0x";
        const contractAddress = this.factory.calculateSingletonAddress(bytecode, deploymentSalt);
        const contractExists = await this.provider.contractExists(contractAddress)
        if (contractExists)
            return { newContract: true, contractAddress }
        const transactionHash = await this.factory.deploy(bytecode, deploymentSalt, opts.gasLimit, opts.gasPrice)
        const contractDeployed = await this.provider.contractExists(contractAddress)
        if (!contractDeployed) throw Error("Contract not deployed");
        return { transactionHash, newContract: true, contractAddress }
    }
}
