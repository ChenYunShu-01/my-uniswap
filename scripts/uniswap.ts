import { Signer } from "@ethersproject/abstract-signer";
import { Contract } from "@ethersproject/contracts";
import {ethers, network} from "hardhat";



function getTokenContract(address:string, account: Signer):Contract {
    const _tokenA = ethers.ContractFactory.getContract(address,
        ['function approve(address spender, uint value) external returns (bool)',
         'function balanceOf(address account) public view returns (uint256)',
        'function allowance(address owner, address spender) public view returns (uint256)'],
        account);
    return _tokenA;
}

function getRouterContract(address:string, account:Signer):Contract {
    const _tokenA = ethers.ContractFactory.getContract(address, 
        [
            'function swapExactTokensForTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts)',
            'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
            'function addLiquidity(address tokenA,address tokenB,uint amountADesired,uint amountBDesired,uint amountAMin,uint amountBMin,address to,uint deadline) external returns (uint amountA, uint amountB, uint liquidity)' 
        ],
        account);

    return _tokenA;
}

async function deploy():Promise<string> {
    let Factory = await ethers.getContractFactory("UniswapV2Factory");

    let [account] = await ethers.getSigners();
    let factory = await Factory.deploy(account.address);
    await factory.deployed();

    console.log(`factory address is ${factory.address}`);


    let weth = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';
    if(network.name == 'kovan'){
        weth = '0xd0A1E359811322d97991E03f863a0C30C2cF029C';
    } else {
        //自己部署一个
        let WETH = await ethers.getContractFactory('WETH');
        let _weth = await WETH.deploy();

        weth = _weth.address;
    }

    console.log(`weth address is ${weth}`)
    
    let Router = await ethers.getContractFactory("UniswapV2Router02");
    let router = await Router.deploy(factory.address, weth);

    await router.deployed();

    console.log(`router address is ${router.address}`)

    return router.address
}

//部署两个自有token
async function deployTokens():Promise<[string, string]>{
    let TokenA = await ethers.getContractFactory("TokenA");
    let tokenA = await TokenA.deploy("10000000000000000000000");  //发行10000个


    let TokenB = await ethers.getContractFactory("TokenB");
    let tokenB = await TokenB.deploy("10000000000000000000000");  //发行10000个


    console.log(`tokenA address is ${tokenA.address}`)
    console.log(`tokenB address is ${tokenB.address}`)

    return [tokenA.address, tokenB.address]
}

//兑换
async function swap(routerAddress:string,
    tokenA:string,tokenB:string) {
    let [account] = await ethers.getSigners();

    const router = getRouterContract(routerAddress,account);

    let amountIn = 10;
    const path = [tokenA, tokenB];
    const to = account.address;
    const deadline = Math.floor(Date.now()/1000)+60*20; //20分钟


    //查一下通过TokenA能兑换多少tokenB
    //B*a*997/(1000*A+997*a)
    const amounts = await router.getAmountsOut(amountIn, path);
    console.log(`amounts is ${JSON.stringify(amounts)}`);


    //查一下余额
    const _tokenA = getTokenContract(tokenA,account);
    const _tokenB = getTokenContract(tokenB,account);

    let balanceA = await _tokenA.balanceOf(account.address);
    let balanceB = await _tokenB.balanceOf(account.address);
    console.log(`balanceA is ${balanceA}, balanceB is ${balanceB}`)


    //授权
    await _tokenA.approve(router.address, amountIn);

    //兑换
    const tx = await router.swapExactTokensForTokens(
        amountIn,
        0,
        path,
        to,
        deadline
    );

    console.log(`Transaction hash: ${tx.hash}`);

    //再查一下tokenAB余额
    balanceA = await _tokenA.balanceOf(account.address);
    balanceB = await _tokenB.balanceOf(account.address);
    console.log(`balanceA is ${balanceA}, balanceB is ${balanceB}`)
    
}

//添加流动性
async function addLiquidity(routerAddress: string, 
    tokenA:string, 
    tokenB:string,
    amountA:number,
    amountB:number) {

    let [account] = await ethers.getSigners();

    const router = getRouterContract(routerAddress,account)


    const _tokenA = getTokenContract(tokenA,account);
    const _tokenB = getTokenContract(tokenB,account);

    //授权
    let tx = await _tokenA.approve(router.address, amountA);
    tx = await _tokenB.approve(router.address, amountB);
    
    
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
    tx = await router.addLiquidity(
        tokenA,
        tokenB,
        amountA,
        amountB,
        0,
        0,
        account.address,
        deadline,
        {gasLimit: 20e9}
    )
    console.log(`Transaction hash: ${tx.hash}`);

}


(async ()=>{
    let factory = await deploy();
    let [tokenA, tokenB] =  await deployTokens();

    //添加流动性
    const amountA = 1000;
    const amountB = 10000;
    await addLiquidity(factory, tokenA, tokenB, amountA, amountB);

    
    //兑换
    await swap(factory, tokenA, tokenB);


})()


