// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Merkle tree

contract Tree {
    // H1-2    H3-4
    // H1   H2  H3   H4
    // TX1  TX2 TX3  TX4
    bytes32[] public hashes;
    string[4] transactions = [
        "TX1: Peter -> Jonh",
        "TX2: Jonh -> Vasya",
        "TX3: Vasya -> Misha",
        "TX4: Misha -> Peter"
    ];

    constructor() {
        // 1 / 2 = 0.5 и solidity округлит до 0
        for(uint i = 0; i < transactions.length; i++) {
            hashes.push(makeHash(transactions[i]));
        }

        uint count = transactions.length;
        uint offset = 0;

        while(count > 0) {
            for(uint i = 0; i < count - 1; i += 2) {
                hashes.push(keccak256(
                    abi.encodePacked(
                        hashes[offset + i], hashes[offset + i + 1]
                    )
                ));
            }
            offset += count;
            count = count / 2;
        }
    }
    // check index 2
    // TX3: Vasya -> Misha
// 6 3 4
// 0xd751b0994ad5c9e8ec6e8db40cbe744abdce6bc835b88fd16045b21dbfc78285
// 0x085978ca43dd8bff977436f5460e69579512c9dc75dedf8e8dbb3de3064f8086
// 0x1f1fe32d4dc4ae1b5d8659cea91c6c5bd0a49fa88b742ae1e0896dbeccba7c02
    function verify(
        string memory transaction,
        uint index,
        bytes32 root,
        bytes32[] memory proof
    ) public pure returns (bool) {
        bytes32 hash = makeHash(transaction);

        for (uint i = 0; i < proof.length; i++) {
            bytes32 element = proof[i];

            if (index % 2 == 0) {
                hash = keccak256(abi.encodePacked(hash, element));
            } else {
                hash = keccak256(abi.encodePacked(element, hash));
            }

            index = index / 2;
        }

        return hash == root;
    }

    function encode(string memory input) public pure returns(bytes memory) {
        return abi.encodePacked(input);
    }

    function makeHash(string memory input) public pure returns(bytes32) {
        return keccak256(
            encode(input)
        );
    }
}
