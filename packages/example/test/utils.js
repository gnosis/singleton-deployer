
async function logGasUsage(subject, transactionHash) {
    let receipt = await web3.eth.getTransactionReceipt(transactionHash)
    let tx = await web3.eth.getTransaction(transactionHash)
    console.log(`    Gas costs for ${subject}: ${receipt.gasUsed} @ ${web3.utils.fromWei(tx.gasPrice, 'gwei')} Gwei`)
}

Object.assign(exports, {
    logGasUsage
})