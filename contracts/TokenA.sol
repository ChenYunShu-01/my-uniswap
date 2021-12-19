pragma solidity =0.6.6;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TokenA is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Token A", "TKA") {
        _mint(msg.sender, initialSupply);
    }
}