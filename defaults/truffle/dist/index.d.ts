import web3 from 'web3';
import { SingletonDeployer, DeployOptions, DeploymentInfo } from '@gnosis.pm/singleton-factory-deployer-core';
export declare const truffleDeployer: (web3: web3) => TruffleSingletonDeployer;
export declare const deployTruffleContract: (web3: web3, artifact: any) => Promise<DeploymentInfo>;
export declare class TruffleSingletonDeployer extends SingletonDeployer {
    deploy(artifact: any, options?: DeployOptions): Promise<DeploymentInfo>;
}
