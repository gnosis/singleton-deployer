import { soliditySHA3 } from 'ethereumjs-abi'
import { keccak256, toChecksumAddress } from 'ethereumjs-util'

export const buildCreate2Address = (deployer: string, salt: string, bytecode: string): string => {
    const addressString = soliditySHA3(
        ['bytes1', 'address', 'bytes32', 'bytes32'], 
        ["0xff", deployer, salt, keccak256(bytecode)]
    ).toString('hex');
    return toChecksumAddress("0x" + addressString.slice(-40));
}
