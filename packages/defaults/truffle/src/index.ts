import web3 from 'web3'
import { SingletonDeployer, DeployOptions, DeploymentInfo } from '@gnosis.pm/singleton-deployer-core'
import { YulSingletonFactory } from '@gnosis.pm/singleton-deployer-yul-factory'
import { Web3jsProvider } from '@gnosis.pm/singleton-deployer-web3js-provider'

export const truffleDeployer = (web3: web3): TruffleSingletonDeployer => {
    const provider = new Web3jsProvider(web3)
    const factory = new YulSingletonFactory(provider)
    return new TruffleSingletonDeployer(factory, provider)
}

export const deployTruffleContract = async (web3: web3, artifact: any, ...args: any[]): Promise<DeploymentInfo> => {
    return await truffleDeployer(web3).deployWithArgs(artifact, args)
}

export class TruffleSingletonDeployer extends SingletonDeployer {

    async deployWithArgs(artifact: any, args: any[], options?: DeployOptions): Promise<DeploymentInfo> {
        const artifactName = artifact.contractName || "Artifact"
        const deployTx = await artifact.new.request(...args)
        const deploymentInfo = await this.deployContract(deployTx.data, options);
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