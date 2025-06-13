const hre = require('hardhat')
const { createPoseidonHash } = require('../../utils/create-poseidon-hash')

async function main() {
    // Get the contract factory
    const Anon = await hre.ethers.getContractFactory('Anon')

    // Replace with your deployed contract address
    const contractAddress = '0x0C1769Ec1aD284fB70e8c2eA0197b206c03b8821'

    // Attach to existing contract
    const anon = Anon.attach(contractAddress)

    // Get signers
    const [deployer] = await hre.ethers.getSigners()

    // Get Poseidon hasher
    const poseidon = await createPoseidonHash()

    // Read contract state
    const secret = 299792458 // speed of light in metres/second (m/s)
    const commitment = await poseidon(secret)

    const tx = await anon.commit(commitment)

    console.log('Transaction hash:', tx.hash)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
