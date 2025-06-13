import { buildPoseidon } from 'circomlibjs'

export const createPoseidonHash = async () => {
    const poseidon = await buildPoseidon()
    return a => poseidon.F.toString(poseidon([a]))
}
