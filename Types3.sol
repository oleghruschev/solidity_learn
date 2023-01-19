// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// array, bytes, enum, struct

contract Types3 {
    // Enum
    enum Status {
        Paid, Delivired, Recived
    }

    Status public currentStatus;

    function pay() public {
        currentStatus = Status.Paid;
    }

     function delivired() public {
        currentStatus = Status.Delivired;
    }

    // Array
    /////////////////////////
    uint[10] public items; // тип uint длина 10, масссив с разными типами быть не может
    function demoArray() public {
        items[0] = 4;
        // items[1]  - 0 by default
        items[2] = 6;
    }

    /////////////////////////
    uint[3][2] public items2; // вложенный массив с права налево
    function demoArray2() public {
        
        items2 = [
            [1,2,3],
            [4,5,6]
        ];
    }

     /////////////////////////
    uint[] public items3; // с динамической длинной

    function sampleMemory() public pure returns(uint[] memory) { // memory - временная переменная 
        uint[] memory tempArray = new uint[](10); // массив в памяти
        tempArray[0] = 1;
        return tempArray;
    }

    // Byte
    bytes28 public myVar = "testfsdfsdzxcvbnm,."; // 1 -> 32
    bytes public myVar2; 

    function getMyVarLength() public view returns(uint) {
        return myVar.length;
    }

      function getMyVarLength2() public view returns(uint) {
        return myVar2.length;
    }

    // Struct as object
    struct Payment {
        uint amount;
        uint timestamp;
        address from;
        string message;
    }

    struct Balance {
        uint totalPayments;
        mapping(uint => Payment) payments;
    }

    mapping(address => Balance) public balances;

    function pay(string memory message) public payable {
        uint paymentNum = balances[msg.sender].totalPayments;

        balances[msg.sender].totalPayments++;

        Payment memory newPayment = Payment(
            msg.value,
            block.timestamp,
            msg.sender,
            message
        );

        balances[msg.sender].payments[paymentNum] = newPayment;
    }

    function getPayment(address _addr, uint _index) public view returns(Payment memory) {
        return balances[_addr].payments[_index];
    }
}
