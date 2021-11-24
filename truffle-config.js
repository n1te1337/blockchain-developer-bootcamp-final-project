const dotenv = require('dotenv');
dotenv.config();

const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = process.env.RINKEBY_MNEMONIC;
const infuraURL = `https://rinkeby.infura.io/v3/${process.env.RINKEBY_INFURA_PROJECT_ID}`;

module.exports = {
  networks: {
    development: {
     host: '127.0.0.1',
     port: 7545,
     network_id: '*',
    },
    test: {
     host: '127.0.0.1',
     port: 8545,
     network_id: '*',
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraURL),
      network_id: 4,
      gas: 5500000,
      from: process.env.RINKEBY_FROM_ADDRESS,
    }
  },
  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
};
