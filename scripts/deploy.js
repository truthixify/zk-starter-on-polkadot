const { ethers } = require('hardhat')

async function main() {
    // Deploy the verifier contract
    const Verifier = await ethers.getContractFactory('Groth16Verifier')
    const verifier = await Verifier.deploy()
    await verifier.waitForDeployment()
    console.log('Verifier deployed to:', await verifier.getAddress())

    // Deploy the Anon contract with the verifier address
    const Anon = await ethers.getContractFactory('Anon')
    const anon = await Anon.deploy(await verifier.getAddress())
    await anon.waitForDeployment()
    console.log('Anon deployed to:', await anon.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
