// SPDX-License-Identifier: MIT

// address, mapping, string

pragma solidity ^0.8.0;

contract Types2 {
    mapping (address => uint) public payments;

    address public myAddr = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    // Если функция payable, то в ней можно ничего не писать и тогда она автоматически зачислит деньги на баланс текущего контрата
    // msg - глобальный объект
    function recieveFunds() public payable {
        payments[msg.sender] = msg.value;
    }

    function transferTo(address targetAdr, uint256 amount) public {
        address payable _to = payable(targetAdr);

        _to.transfer(amount);
    }

    function getBallance(address targetAddr) public view returns (uint256) {
        return targetAddr.balance;
    }

    string public myStr = "Hello"; // storage

    function demo(string memory newValueStr) public {
        // string memory myTempStr = "temp";
        myStr = newValueStr;
    }
}
