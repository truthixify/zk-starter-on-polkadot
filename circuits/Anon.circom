pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/poseidon.circom";

// compute the root of a MerkleTree of n Levels 
template validateHash() { 
    signal input secret;
    signal input secretHash;

    component hash = Poseidon(1);
    hash.inputs[0] <== secret;

    secretHash === hash.out;
}

component main { public [ secretHash ] } = validateHash();