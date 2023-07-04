// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract EthAvaxAssessment{

    uint public totalSmiles;
    constructor(uint initSmiles) {
        totalSmiles = initSmiles;
        console.log("let's see some smiles!");
    }

    function recieveSmile() public {
        totalSmiles += 1;
        console.log("%s has smiled!", msg.sender);
    }

    function sendSmile() public {
        totalSmiles -= 1;
    }

    function getTotalSmiles() public view returns (uint256) {
        console.log("We have %d total smiles!", totalSmiles);
        return totalSmiles;
    }

}