// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Demo {
    // require
    // revert
    // assert

    address owner;

    // log
    event Paid(address indexed _from, uint256 _amount, uint256 timestamp); // - по indexed можно реалзиовать поиск

    constructor() {
        owner = msg.sender;
    }

    // receive вызывается автоматически, если в контракт пришли средства
    receive() external payable {
        pay();
    }

    function pay() public payable {
        emit Paid(msg.sender, msg.value, block.timestamp);
    }

    address demoAddr; // 0x00000....

    // кастомный модификатор
    modifier onlyOwner(address _to) {
        require(msg.sender == owner, "you are not an owner");
        require(_to != address(0));
        _;
    }

    function withdraw(address payable _to) external payable onlyOwner(_to) {
        // 1 вариант
        require(msg.sender == owner, "you are not an owner");

        // 2 вариант
        if (msg.sender != owner) {
            revert("you are not an owner");
        }

        // Panic
        assert(msg.sender == owner);

        _to.transfer(address(this).balance);
    }
}
