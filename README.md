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


**合约结构：**
UniswapV2ERC20 ---继承---> UniswapV2Pair ---引用---> UniswapV2Factory

**创建流动性**
项目方 ---创建流动性---> UniswapV2Router ---调用---> UniswapV2Factory ---部署---> UniswapV2Pair

**交易**
用户 ---交易---> UniswapV2Router ---调用---> UniswapV2Pair

**Uniswap运行逻辑**
1. uniswap核心合约分为3个合约，工厂合约，配对合约，ERC20合约
2. 核心合约部署时只需要部署工厂合约
3. 工厂合约部署时构造函数只需要设定一个手续费管理员
4. 工厂合约部署之后就可以进行创建配对的操作
5. 要在交易所中进行交易，操作顺序写是：创建交易对，添加流动性，交易
6. 添加配对时需要提供两个token的地址，随后工厂合约会为这个交易对部署一个新的配对合约
7. 配对合约的部署是通过create2方法
8. 两个token地址按二进制大小排序后一起进行hash，以这个hash值作为create2的salt进行部署
9. 配对合约的地址是可以通过两个token地址进行create2计算的
10. 用户可以将两个token存入到配对合约中，然后在配对合约中为用户生成一种兼容ERC20的token
11. 配对合约中生成的ERC20 token可以成为流动性
12. 用户可以将自己的流动性余额兑换成配对合约中的任何一种token
13. 用户也可以取出流动性，配对合约将销毁流动性，并将两种token同时返还用户
14. 返还的数量将根据流动性数量和两种token的储备量重新计算，如果有手续费收益，用户也将得到收益
15. 用户可以通过一种token交换另一种token，配对合约将扣除3%的手续费
16. 在uniswap核心合约基础上，还有一个路由合约用来更好的操作核心合约
17. 路由合约拥有3部分操作方法，添加流动性，移除流动性，交换
18. 虽然配对合约已经可以完成所有的交易操作，但路由合约将所有操作整合，配合前端更好的完成交易
19. 因为路由合约的代码较多，部署时会超过gas限制，所以路由合约被分为两个版本，功能互相补充

