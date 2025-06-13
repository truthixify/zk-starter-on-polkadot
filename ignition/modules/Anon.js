const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules')

const AnonModule = buildModule('AnonModule', m => {
    // Deploy the Groth16Verifier contract
    const verifier = m.contract('Groth16Verifier')

    // Deploy the Pass contract with verifier address
    const anon = m.contract('Anon', [verifier])

    return { anon }
})

module.exports = AnonModule
