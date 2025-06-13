const { expect } = require('chai')
const { ethers } = require('hardhat')
const { createPoseidonHash } = require('../utils/create-poseidon-hash')
const { generateProofCalldata } = require('../utils/generate-proof-calldata')

describe('Anon', function () {
    let anon
    let addr
    let poseidon

    beforeEach(async function () {
        // Get signers
        ;[addr] = await ethers.getSigners()

        // Get Poseidon
        poseidon = await createPoseidonHash()

        // Deploy a mock verifier that always returns true
        const Verifier = await ethers.getContractFactory('Groth16Verifier')
        const verifier = await Verifier.deploy()
        await verifier.waitForDeployment()

        // Deploy the Anon contract with the mock verifier
        const Anon = await ethers.getContractFactory('Anon')
        anon = await Anon.deploy(verifier.getAddress())
        await anon.waitForDeployment()
    })

    describe('Anon Contract Test', function () {
        it('should allow a user to commit', async function () {
            const secret = 123456
            const commitment = poseidon(secret)

            await expect(anon.connect(addr).commit(commitment))
                .to.emit(anon, 'Committed')
                .withArgs(await addr.getAddress(), commitment)

            const stored = await anon.commitments(await addr.getAddress())
            expect(stored).to.equal(commitment)
        })

        it('should not allow committing twice', async function () {
            const secret = 123456
            const commitment = poseidon(secret)

            await anon.connect(addr).commit(commitment)

            await expect(
                anon.connect(addr).commit(commitment)
            ).to.be.revertedWith('already committed')
        })

        it('should verify proof and delete commitment', async function () {
            const secret = 123456
            const commitment = poseidon(secret)

            await anon.connect(addr).commit(commitment)

            const input = {
                secret,
                secretHash: commitment
            }

            const proof = await generateProofCalldata(
                input,
                'circuits/build/anon_js/anon.wasm',
                'circuits/build/anon.zkey'
            )

            await expect(
                anon.connect(addr).prove(proof.a, proof.b, proof.c, proof.input)
            )
                .to.emit(anon, 'Proved')
                .withArgs(await addr.getAddress())

            const stored = await anon.commitments(await addr.getAddress())
            expect(stored).to.equal(0)
        })

        it('should fail proof if not committed', async function () {
            const secret = 123456
            const commitment = poseidon(secret)

            const input = {
                secret,
                secretHash: commitment
            }
            const proof = await generateProofCalldata(
                input,
                'circuits/build/anon_js/anon.wasm',
                'circuits/build/anon.zkey'
            )

            await expect(
                anon.connect(addr).prove(proof.a, proof.b, proof.c, proof.input)
            ).to.be.revertedWith('no commitment')
        })
    })
})
