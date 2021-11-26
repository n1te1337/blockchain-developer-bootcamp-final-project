// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./ACMEToken.sol";

/// @title Contract facilitating selling ACME tokens and withdrawing the proceeds
/// @author Pav
/// @notice Relies on ETH/USD Chainlink Data Feed
/// @dev Extends Ownable contract to restrict the withdrawal functionality
contract Vendor is Ownable {

  /// @dev Reference to the ERC20 ACME Token contract
  ACMEToken internal acmeToken;

  /// @dev Reference to the Chainlink ETH/USD Data Feed
  AggregatorV3Interface internal priceFeed;

  /// @notice Emitted when user buys ACME tokens
  /// @param buyer Address of the buyer
  /// @param amountOfEth Amount of ETH used for the purchase
  /// @param amountOfTokens Amount of ACME tokens purchased
  event BuyTokens(address indexed buyer, uint amountOfEth, uint amountOfTokens);

  /// @param _tokenAddress Address of the ECR20 ACME Token contract
  /// @param _priceFeedAddress Address of the Chainlink ETH/USD Data Feed
  constructor(address _tokenAddress, address _priceFeedAddress) {
    acmeToken = ACMEToken(_tokenAddress);
    priceFeed = AggregatorV3Interface(_priceFeedAddress);
  }

  /// @notice Convenience method for looking up ACME token balance
  /// @param _account Address to lookup the balance for
  /// @return Balance of ACME token for the supplied address
  function balanceOf(address _account) public view returns (uint) {
    return acmeToken.balanceOf(_account);
  }

  /// @notice Allows buying ACME tokens with ETH
  /// @dev Transfers the ownership of the purchased ACME tokens ERC20 transfer() method
  /// @return tokenAmount the number of purchased ACME tokens
  function buyTokens() public payable returns (uint) {
    require(msg.value > 0, "Value must be greater than zero");

    uint tokenAmount = msg.value * getLatestTokensPerEth();

    require(acmeToken.balanceOf(address(this)) >= tokenAmount, "Not enough tokens left");

    (bool success) = acmeToken.transfer(msg.sender, tokenAmount);
    require(success, "Token transfer failed");

    emit BuyTokens(msg.sender, msg.value, tokenAmount);

    return tokenAmount;
  }

  /// @notice Allows withdrawing of the current ETH balance of the contract
  /// @dev Uses onlyOwner modifier to limit access to the method to the contract owner
  function withdraw() public payable onlyOwner {
    uint ownerBalance = address(this).balance;

    require(ownerBalance > 0, "The balance is 0");

    (bool success,) = msg.sender.call{ value: ownerBalance }("");

    require(success, "Unable to process the withdrawal");
  }

  /// @notice Returns the latest number of tokens in relation to 1 ETH
  /// @dev Uses Chainlink ETH/USD Data Feed
  /// @return tokensPerEth based on the current price of ETH
  function getLatestTokensPerEth() public view returns (uint) {
    (,int price,,,) = priceFeed.latestRoundData();

    return uint(price) / 100000000;
  }
}
