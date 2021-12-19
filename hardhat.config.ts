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
// 这里替换为自己的助记词
const mnemonic = "**********";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "https://ropsten.infura.io/v3/73f0ab2741974136a696cf8e7672d385",
        blockNumber: 24459306,
      },
      accounts: {
        mnemonic: mnemonic
      },

        gas: 20e9,
        blockGasLimit: 0x1fffffffffffff,
        allowUnlimitedContractSize: true,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/73f0ab2741974136a696cf8e7672d385",
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

