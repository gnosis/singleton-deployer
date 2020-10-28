import { ProviderAdapter, Transaction } from '@gnosis.pm/singleton-deployer-core'
import web3 from 'web3'
import { PromiEvent, TransactionReceipt } from 'web3-core'

const toConfirmationPromise = (promiEvent: PromiEvent<TransactionReceipt> ) => new Promise<TransactionReceipt>((resolve, reject) => {
    promiEvent
        .on('confirmation', (_confirmationNumber: number, receipt: TransactionReceipt, _latestBlockHash?: string) => resolve(receipt))
        .on('error', reject);
});

export class Web3jsProvider implements ProviderAdapter {

    readonly web3: web3

    constructor(web3: web3) {
        this.web3 = web3
    }

    async account(): Promise<string> {
        const [account] = await this.web3.eth.getAccounts()
        return account
    }

    async balance(address: string): Promise<string> {
        return await this.web3.eth.getBalance(address)
    }

    async contractExists(address: string): Promise<boolean> {
        return (await this.web3.eth.getCode(address)) !== '0x'
    }

    async call(tx: Transaction): Promise<string> {
        return await this.web3.eth.call(tx, 'latest')
    }

    async estimateGas(tx: Transaction): Promise<number> {
        return await this.web3.eth.estimateGas(tx)
    }

    async sendTransaction(tx: Transaction): Promise<string> {
        const from = await this.account()
        const { transactionHash } = await toConfirmationPromise(this.web3.eth.sendTransaction({ from, ...tx }))
        return transactionHash
    }

    async sendRawTransaction(rawTx: string): Promise<string> {
        const { transactionHash } = await toConfirmationPromise(this.web3.eth.sendSignedTransaction(rawTx))
        return transactionHash
    }
}