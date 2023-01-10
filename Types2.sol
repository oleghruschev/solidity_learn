// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Types2 {
    address public myAddr = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    function getBallance(address targetAddr) public view returns(uint) {
        return targetAddr.balance;
    }

    string public myStr = "Hello"; // storage

    function demo(string memory newValueStr) public {
        // string memory myTempStr = "temp";
        myStr = newValueStr;
    }
}
