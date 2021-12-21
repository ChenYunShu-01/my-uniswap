# my-uniswap
本项目是关于uniswap的sdk和前端，可部署到兼容EVM的区块链，已部署到以太坊测试链Ropsten，前端需要修改 Factory Address， WETH Address，Router Address，和INIT_CODE_HASH四个参数，这样就可以在本地部署并打开Uniswap前端界面，添加自定义的流动性以及兑换币。Uniswap是基于以太坊的代币交换协议，是基于兑换池，而不是订单簿的去中心化交易协议。而所谓的兑换池，指的则是一个资金池，用户在 Uniswap 中交易的价格则由这个资金池中的代币比例和算法来决定。 

**步骤**

1. 下载本仓库my-uniswap的代码（已集成factory，router和weth合约），运行 yarn
2. 运行编译命令 yarn hardhat compile
3. 修改scripts/uniswap.ts中的助记词为你的私钥助记词（因为部署需要消耗gas），
4. 修改contract/libraty/UniswapV2Libraty.sol中pairFor函数中的hex为你的INIT_CODE_HASH，如果不修改在创建流动性的时候会遇到错误，这里自己部署的话，要重新计算一下，参照factory中的createPair
5. 运行部署命令 yarn hardhat run scripts/uniswap.ts --network ropsten 获得factory address，router address，weth address，以及自定义的两个代币地址tokenA address， tokenB address，这些地址将会用于修改前端代码。
6. 下载uniswap interface的代码（uniswap前端代码），推荐下载较早期的版本：git clone -b v2.6.5 https://github.com/Uniswap/interface.git 并运行npm install，
7. 修改 src/constants/index.ts 文件的 ROUTER_ADDRESS，
8. 修改 node_modules/@uniswap/sdk/dist/constants.d.ts 文件的 FACTORY_ADDRESS 和 INIT_CODE_HASH
9. 修改 node_modules/@uniswap/sdk/dist/sdk.esm.js 文件的 FACTORY_ADDRESS 和 INIT_CODE_HASH
10. 如果你的项目部署到其他链，修改env中的 REACT_APP_CHAIN_ID 和 REACT_APP_NETWORK_URL
11. 运行yarn start，成功部署前端到本地，可以用之前部署的代币tokenA和tokenB作为测试添加流动性以及兑换

