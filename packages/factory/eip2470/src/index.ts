
import { BaseSingletonFactory, ProviderAdapter, Transaction } from '@gnosis.pm/singleton-deployer-core'
import { simpleEncode, simpleDecode } from 'ethereumjs-abi'
import { bufferToHex, toBuffer } from 'ethereumjs-util'

export class EIP2470SingletonFactory extends BaseSingletonFactory {

    readonly address: string = "0xce0042B868300000d44A59004Da54A005ffdcf9f"
    readonly deployer: string = "0xBb6e024b9cFFACB947A71991E386681B1Cd1477D";
    readonly deploymentTx: string = "0xf9016c8085174876e8008303c4d88080b90154608060405234801561001057600080fd5b50610134806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80634af63f0214602d575b600080fd5b60cf60048036036040811015604157600080fd5b810190602081018135640100000000811115605b57600080fd5b820183602082011115606c57600080fd5b80359060200191846001830284011164010000000083111715608d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550509135925060eb915050565b604080516001600160a01b039092168252519081900360200190f35b6000818351602085016000f5939250505056fea26469706673582212206b44f8a82cb6b156bfcc3dc6aadd6df4eefd204bc928a4397fd15dacf6d5320564736f6c634300060200331b83247000822470";
    readonly deploymentCosts: string = "0x" + (24_700_000_000_000_000).toString(16)
    readonly factoryAbiString = "deploy(bytes,bytes32):(address)"

    constructor(provider: ProviderAdapter) {
        super(provider)
    }
    
    async buildDeployData(bytecode: string, salt: string): Promise<string> {
        return bufferToHex(simpleEncode(this.factoryAbiString, toBuffer(bytecode), toBuffer(salt)))
    }
    
    async simulateDeploy(tx: Transaction): Promise<string> {
        const resp = await this.provider.call(tx);
        const [ address ] = simpleDecode(this.factoryAbiString, toBuffer(resp))
        return "0x" + address
    }
}