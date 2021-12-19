pragma solidity =0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TokenB{
    string public name     = "Token B";
    string public symbol   = "TKB";
    uint8  public decimals = 18;
    uint _totalSupply;

    event  Approval(address indexed src, address indexed guy, uint wad);
    event  Transfer(address indexed src, address indexed dst, uint wad);
    event  Deposit(address indexed dst, uint wad);
    event  Withdrawal(address indexed src, uint wad);

    mapping (address => uint)                       public  balanceOf;
    mapping (address => mapping (address => uint))  public  allowance;

    constructor(uint256 initialSupply) public {
        _totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;
    }

    function totalSupply() public view returns (uint) {
        return _totalSupply;
    }

    function approve(address guy, uint wad) public returns (bool) {

        console.log("approve %s=>%s, %s", msg.sender, guy, wad);
        allowance[msg.sender][guy] = wad;
        emit Approval(msg.sender, guy, wad);
        return true;
    }

    function transfer(address dst, uint wad) public returns (bool) {
        return transferFrom(msg.sender, dst, wad);
    }

    function transferFrom(address src, address dst, uint wad)
        public
        returns (bool)
    {
        console.log("TokenB transferFrom sender is %s,recipient is %s, amount is %s ", src, dst, wad);

        require(balanceOf[src] >= wad, "transferFrom balance not ");
        
        if (src != msg.sender && allowance[src][msg.sender] != uint(-1)) {
            require(allowance[src][msg.sender] >= wad, "transferFrom allowance not ");
            allowance[src][msg.sender] -= wad;
        }


        balanceOf[src] -= wad;
        balanceOf[dst] += wad;

        emit Transfer(src, dst, wad);

        return true;
    }
}