import { stripHexPrefix, isHexPrefixed } from 'ethjs-util'
import { BN, addHexPrefix } from 'ethereumjs-util'

export const toBN = (value: string): BN => {
    return new BN(stripHexPrefix(value), isHexPrefixed(value) ? 'hex' : 10)
}

export const toHexString = (bn: BN): string => {
    return addHexPrefix(bn.toString('hex'))
}