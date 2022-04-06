import web3 from 'web3'
import { SingletonDeployer, DeployOptions, DeploymentInfo } from '@gnosis.pm/singleton-deployer-core'
import { YulSingletonFactory } from '@gnosis.pm/singleton-deployer-yul-factory'
import { SafeSingletonFactory } from '@gnosis.pm/singleton-deployer-safe-factory'
import { Web3jsProvider } from '@gnosis.pm/singleton-deployer-web3js-provider'

export const truffleDeployer = (web3: web3, chainId: number, useEIP155DeployedFactory = false): TruffleSingletonDeployer => {
    const provider = new Web3jsProvider(web3)
    let factory = new YulSingletonFactory(provider, chainId)
    if (useEIP155DeployedFactory) {
        factory = new SafeSingletonFactory(provider, chainId)
    }
    return new TruffleSingletonDeployer(factory, provider)
}

export const deployTruffleContract = async (web3: web3, artifact: any, useEIP155DeployedFactory = false, ...args: any[]): Promise<DeploymentInfo> => {
    const chainId = await web3.eth.getChainId()

    return await truffleDeployer(web3, chainId, useEIP155DeployedFactory).deployWithArgs(artifact, args)
}

export class TruffleSingletonDeployer extends SingletonDeployer {

    async deployWithArgs(artifact: any, args: any[], options?: DeployOptions): Promise<DeploymentInfo> {
        const artifactName = artifact.contractName || "Artifact"
        const deployTx = await artifact.new.request(...args)
        const opts = {
            gasPrice: artifact.class_defaults?.gasPrice,
            ...options
        }
        const deploymentInfo = await this.deployContract(deployTx.data, opts);
        const { contractAddress, transactionHash, newContract } = deploymentInfo
        if (newContract) {
            console.log(`Deployed ${artifactName} at ${contractAddress}`);

            artifact.address = contractAddress;
            artifact.transactionHash = transactionHash;
        } else {
            try {
                const addressOnArtifact = artifact.address;
                if (addressOnArtifact !== contractAddress) {
                    console.warn(`Expected to find ${contractAddress
                        } set as ${artifactName} address but instead found ${artifact.address
                        } so the address is being updated, but the transaction hash should be manually corrected`);
                } else {
                    console.log(`Found ${artifactName} at ${contractAddress}`);
                }
            } catch (e) {
                if (e.message.startsWith(`${artifactName} has no network configuration for its current network id`)) {
                    console.warn(`Expected to find ${contractAddress
                        } set as ${artifactName} address but instead couldn't find an address, so the address is being updated, but the transaction hash should be manually added`);
                } else {
                    throw e;
                }
            }
            artifact.address = contractAddress;
        }
        return deploymentInfo
    }

    deploy(artifact: any, options?: DeployOptions): Promise<DeploymentInfo> {
        return this.deployWithArgs(artifact, [], options)
    }
}