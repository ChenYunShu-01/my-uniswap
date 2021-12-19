

#### uniswap整合版

1. 测试脚本

`npx hardhat run scripts/uniswap.ts  --network kovan`


#### 说明

1. Router02代码量太大，会导致out of gas，所以注释了几个平时用不上的函数

2. getPair中写死了一段code hash, 这个可以在部署的时候自己算出来填上去，我加了一个打印输出函数，注意看 hardhat node中的输出



