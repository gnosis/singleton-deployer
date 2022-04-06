import {
    BaseSingletonFactory,
    ProviderAdapter,
    Transaction,
} from "@gnosis.pm/singleton-deployer-core"
import { getSingletonFactoryInfo, SingletonFactoryInfo } from "@gnosis.pm/safe-singleton-factory"

// A factory based on https://github.com/gnosis/safe-singleton-factory
// It has to be deployed to the destination network to use
export class SafeSingletonFactory extends BaseSingletonFactory {
    private factoryInfo: SingletonFactoryInfo

    constructor(provider: ProviderAdapter, public chainId: number) {
        super(provider)

        const factoryInfo = getSingletonFactoryInfo(this.chainId)
        if (!factoryInfo) {
            throw new Error(
                `No factory info found for chainId ${this.chainId}, please check instructions in https://github.com/gnosis/safe-singleton-factory on how to add it`
            )
        }
        this.factoryInfo = factoryInfo
    }

    get address() {
        return this.factoryInfo.address
    }

    get deploymentTx() {
        return this.factoryInfo.transaction
    }

    get deploymentCosts() {
        return "0x" + (this.factoryInfo.gasLimit * this.factoryInfo.gasPrice).toString(16)
    }

    get deployer() {
        return this.factoryInfo.signerAddress
    }

    calculateSingletonAddress(bytecode: string, salt: string | "0x"): string {
        if (salt === "0x") {
            salt = "0x0000000000000000000000000000000000000000000000000000000000000000"
        }

        return super.calculateSingletonAddress(bytecode, salt)
    }

    async buildDeployData(bytecode: string, salt: string | "0x"): Promise<string> {
        if (salt === "0x") {
            salt = "0x0000000000000000000000000000000000000000000000000000000000000000"
        }

        return `${salt}${bytecode.replace(/^0x/, "")}`
    }

    async simulateDeploy(tx: Transaction): Promise<string> {
        return await this.provider.call(tx)
    }
}
