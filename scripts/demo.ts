import { utils } from "ethers";
import {ethers} from "hardhat"



async function main() {
    //1. 部署工厂合约
    const [owner] = await ethers.getSigners();

    console.log(`owner is ${owner.address}`);

    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    let factory = await UniswapV2Factory.deploy(owner.address)


    await factory.deployed()

    console.log(`factory address is ${factory.address}`);


    const wethAddress = owner.address;
    const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
    let router = await UniswapV2Router02.deploy(factory.address, wethAddress)


    await router.deployed()

    console.log(`router address is ${router.address}`);
}


main()