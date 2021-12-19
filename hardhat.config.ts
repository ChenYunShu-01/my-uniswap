import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  
  for (const account of accounts) {
    console.log(account.address);
  }
});



// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";

dotenv.config();
const mnemonic = "frequent unhappy asset plug kitten dad warm begin run feed often expand";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        // url: 'https://mainnet.infura.io/v3/0513b51a04a54bb7a68b4d330777d74a'
        url: "https://ropsten.infura.io/v3/73f0ab2741974136a696cf8e7672d385",
        //url: "https://eth-kovan.alchemyapi.io/v2/_-ujxbv-FqFBsTabUAIF6HKRuD3nqvwu",
        blockNumber: 24459306,
      },
      accounts: {
        mnemonic: mnemonic
      },

        gas: 20e9,
        blockGasLimit: 0x1fffffffffffff,
        allowUnlimitedContractSize: true,
    },
    kovan: {
      url: "https://eth-kovan.alchemyapi.io/v2/_-ujxbv-FqFBsTabUAIF6HKRuD3nqvwu",
      // url: "https://kovan.infura.io/v3/0513b51a04a54bb7a68b4d330777d74a",
      // accounts: ['49c794db293f4a6e8422107495b0610017b6f1b2972fa975d9331d39c507d453']
      accounts: {
        mnemonic: mnemonic
      },
      timeout: 600000,

      gas: 20e10,
      blockGasLimit: 0x1fffffffffffff,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/73f0ab2741974136a696cf8e7672d385",
      //url: "https://eth-kovan.alchemyapi.io/v2/_-ujxbv-FqFBsTabUAIF6HKRuD3nqvwu",
      // url: "https://kovan.infura.io/v3/0513b51a04a54bb7a68b4d330777d74a",
      // accounts: ['49c794db293f4a6e8422107495b0610017b6f1b2972fa975d9331d39c507d453']
      accounts: {
        mnemonic: mnemonic
      },
      timeout: 600000,

      gas: 20e10,
      blockGasLimit: 0x1fffffffffffff,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.7.3',
        settings:{
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      },
      {
        version: '0.6.6',
        settings:{
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      },
      {
        version: '0.5.8',
        settings:{
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      },
      {
        version: '0.5.16',
        settings:{
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      },
      {
        version: '0.6.12',
        settings:{
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      },
    ]
  },

  mocha: {
    timeout: 60000
  }
};

export default config;

