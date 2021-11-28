# Final project - USD pegged token sale

![Truffle test suite](https://github.com/n1te1337/blockchain-developer-bootcamp-final-project/actions/workflows/truffle.yaml/badge.svg)

## Deployed version url

https://main.dtqo6rsppdapw.amplifyapp.com

## How to run this project locally

### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- Yarn
- `git clone git@github.com:n1te1337/blockchain-developer-bootcamp-final-project.git`

### Contracts

- Run `yarn install` in the project root to install Truffle build and smart contract dependencies
- Run local testnet on port `7545` with an Ethereum client, e.g. Ganache
- Run `truffle deploy` to deploy the contracts to the testnet
- Run `truffle test` to run the test suite

### Frontend

- `cd frontend`
- `yarn install`
- `yarn start`
- Open `http://localhost:3000`

### How to use the frontend with the local testnet

- Stop the frontend if it's already running
- `cd frontend`
- Open the `constants.js` file and update the address of the `Vendor` contract (`ACME_TOKEN_CONTRACT_ADDRESS`) and save the file
- `yarn start`
- Open `http://localhost:3000`

## Screencast link

TODO: https://youtube.com

## Public Ethereum wallet for certification

`0x225D0A7C8832E0Dcb9bF60F13D17b4D32128BE8b`

## Project description

ACME project is holding a sale of their ACME token. In order to make the token price fair the company decided to peg the price of the token to 1 USD which leverages Chainlink ETH/USD Data Feed. They created a dapp which facilitates the sale of 1,000,000 tokens and they only accept ETH as the payment method.

The fronend web app for the token sale serves as an interface for the dapp and it allows a seamless exchange of ETH for ACME with the ETH/ACME price automatically updating to ensure that 1 ACME = 1 USD. The web app supports connecting with Metamask for easy user experice.

## Simple workflow

1. Make sure your Metamask is configured with the correct network type (local testnet or Rinkeby) and has some ETH available
2. Click `Connect` in the top-right corner of the UI to connect Metamast
3. Enterh the amount of ETH you'd like to spend on ACME tokens
4. Take note of the current exchange rate below
5. Click the `Confirm` button
6. Confirm the transaction in Metamask
7. Wait for the transaction to complete
8. Click "Go back" button to go back to the main screen
9. Take note of the current ACME token balance in the top-left corner

## Directory structure

- `frontend`: Project's React frontend.
- `contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.
- `.github`: Github Actions config to run the test suite on every code push

## Environment variables (not needed for running project locally)

```
RINKEBY_MNEMONIC
RINKEBY_INFURA_PROJECT_ID
RINKEBY_FROM_ADDRESS
RINKEBY_CHAINLINK_DATA_FEED_ADDRESS
```
