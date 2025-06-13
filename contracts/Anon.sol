// SPDX-License-Identifier: NONE
pragma solidity 0.8.28;

interface IVerifier {
    function verifyProof(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) external view returns (bool);
}

contract Anon {
    IVerifier public immutable verifier;
    mapping(address => uint) public commitments;

    event Committed(address indexed user, uint commitment);
    event Proved(address indexed user);

    constructor(address _verifier) {
        verifier = IVerifier(_verifier);
    }

    function commit(uint commitment) public {
        require(commitments[msg.sender] == 0, "already committed");

        commitments[msg.sender] = commitment;
        emit Committed(msg.sender, commitment);
    }

    function prove(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[1] memory input
    ) external payable {
        require(commitments[msg.sender] != 0, "no commitment");
        require(commitments[msg.sender] == input[0], "commitment mismatch");

        bool verified = verifier.verifyProof(a, b, c, input);
        require(verified, "invalid proof");

        delete commitments[msg.sender];
        emit Proved(msg.sender);
    }
}