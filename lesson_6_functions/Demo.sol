// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DemoFunctions {
    // Области видимости:
    // public - доступна везде
    // external - можно обращаться только из вне
    // internal - можно обращаться только изнутри контракта или отнаследованные
    // private - как internal только нельзя обращаться из потомков

    // Модификаторы
    // view  - можно только читать данные блокчейна, но не модифицировать
    // pure - не может читать данные вне своего блока видимости
    // payable - функция может принимать деньги

    string message = "hello";

    // trsnsaction
    function setMessage(string memory newMessage) external {
        message = newMessage;
    }

    uint256 public balance;

    function pay() external payable {
        balance += msg.value; // если не payable, то обратиться к msg нельзя
    }

    recieve() external payable {
        // balance += msg.value;
    }

    fallback() external payable {
        // ...
    }
}
