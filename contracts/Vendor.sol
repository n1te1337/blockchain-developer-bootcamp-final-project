// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./ACMEToken.sol";

contract Vendor is Ownable {

  ACMEToken internal acmeToken;
  AggregatorV3Interface internal priceFeed;

  event BuyTokens(address indexed buyer, uint amountOfEth, uint amountOfTokens);

  constructor(address tokenAddress, address priceFeedAddress) {
    acmeToken = ACMEToken(tokenAddress);
    priceFeed = AggregatorV3Interface(priceFeedAddress);
  }

  function balanceOf(address account) public view returns (uint) {
    return acmeToken.balanceOf(account);
  }

  function buyTokens() public payable returns (uint) {
    require(msg.value > 0, "Value must be greater than zero");

    uint tokenAmount = msg.value * getLatestTokensPerEth();

    require(acmeToken.balanceOf(address(this)) >= tokenAmount, "Not enough tokens left");

    (bool success) = acmeToken.transfer(msg.sender, tokenAmount);
    require(success, "Token transfer failed");

    emit BuyTokens(msg.sender, msg.value, tokenAmount);

    return tokenAmount;
  }

  function withdraw() public payable onlyOwner {
    uint ownerBalance = address(this).balance;

    require(ownerBalance > 0, "The balance is 0");

    (bool success,) = msg.sender.call{ value: ownerBalance }("");

    require(success, "Unable to process the withdrawal");
  }

  function getLatestTokensPerEth() public view returns (uint) {
    (,int price,,,) = priceFeed.latestRoundData();

    return uint(price) / 100000000;
  }
}
