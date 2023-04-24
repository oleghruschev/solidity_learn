// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Optimzsed {
    uint demo; // = 0 by default

    uint demo2 = 1;

    uint8[] arr = [1,2,3];

    uint128 a = 1; // uint128
    uint128 b = 1; // uint128 подряд, тогда они кладутся в одну ячейку
    uint256 c = 1;

    // bytes32 public hash = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    mapping(address => uint) payments;
    function pay() external payable {
        require(msg.sender != address(0), "zero address");
        payments[msg.sender] = msg.value;
    }

    // ...
}

contract Unoptimized {
    uint demo = 0;

    uint128 demo2 = 1;

    uint[] arr = [1,2,3];

    uint128 a = 1;
    uint256 c = 1;
    uint128 b = 1;

    // bytes32 public hash = keccak256(abi.encodePacked("test"));

    mapping(address => uint) payments;
    function pay() external payable {
        address _from = msg.sender;
        require(_from != address(0), "zero address");
        payments[_from] = msg.value;
    }

    //
}

