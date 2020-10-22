import { ProviderAdapter, Transaction } from '@gnosis.pm/singleton-factory-deployer-core';
import web3 from 'web3';
export declare class Web3jsProvider implements ProviderAdapter {
    readonly web3: web3;
    constructor(web3: web3);
    account(): Promise<string>;
    contractExists(address: string): Promise<boolean>;
    call(tx: Transaction): Promise<string>;
    estimateGas(tx: Transaction): Promise<number>;
    sendTransaction(tx: Transaction): Promise<string>;
    sendRawTransaction(rawTx: string): Promise<string>;
}
