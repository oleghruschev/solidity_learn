// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// bool, uint

// 1) bool
// 2) unsigned integers - без знака (положительное) >= 0
//    signed integers - со знаком < 0

contract Types {
    uint8 public myVal = 254;
    function inc() public {
        // myVal = myVal + 1;
        // myVal +=1;
        // myVal++;
        // myVal--;
        unchecked {
            myVal++;
        }
    }
    // bool
    bool public myBool = true; // state

    //unsigned integers
    uint public myUint = 5;
    uint8 public mySmallUint = 255;
    // 2 ** 8 = 255 max ** - степень

    int public myInt = -42;
    int8 public mySmallInt = -128;
    // 2 ** 7 = 127 max (1 бит на знак)

    uint public maximum;
    function demo() public {
        maximum = type(uint8).max;
    }

    // function myFunc(bool _inputBool) public {
    //     bool localBool = false; // local

    //     localBool && _inputBool;
    //     localBool || _inputBool;
    //     localBool != _inputBool;
    //     !localBool;

    //     if (localBool || _inputBool) {
    //         // to do something
    //     }
    // }
}
