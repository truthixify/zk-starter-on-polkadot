import { groth16 } from 'snarkjs'

export async function generateProofCalldata(input, wasmPath, zkeyPath) {
    const { proof, publicSignals } = await groth16.fullProve(
        input,
        wasmPath,
        zkeyPath
    )

    const calldata = await groth16.exportSolidityCallData(proof, publicSignals)

    const argv = calldata
        .replace(/["[\]\s]/g, '')
        .split(',')
        .map(x => BigInt(x).toString())

    const a = [argv[0], argv[1]]
    const b = [
        [argv[2], argv[3]],
        [argv[4], argv[5]]
    ]
    const c = [argv[6], argv[7]]
    const inputSignals = argv.slice(8)

    return { a, b, c, input: inputSignals }
}
