# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in the `withdraw()` function. This function has to be restricted so that the funds can only be withdrawn by the contract current owner.

## Oracles

- `Chainlink Data Feed` is used to retrieve the current price for ETH/USD, the price is used to dynamically determine the number of ACME tokens to retun in exchange for ETH.

## Inheritance and Interfaces

- `ACMEToken` contract inherits the OpenZeppelin `ERC20` contract so that it can be used as an ERC20 compatible token used for the token sale.

- `Vendor` contract inherits the OpenZeppelin `Ownable` contract so that it can be used for protecting the `withdraw()` function.