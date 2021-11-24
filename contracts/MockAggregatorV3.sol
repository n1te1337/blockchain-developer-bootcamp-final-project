// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Mock contract to imitate Chainlink Data Feed
/// @author Pav
/// @notice Used in lieu of ETH/USD Data Feed
/// @dev Uses hardcoded initial values
contract MockAggregatorV3 {

  /// @dev Initializes the answer to $4281.9 per ETH
  int256 public answer = 428190000000;

  /// @notice Returns the latest price data
  /// @dev Only the `answer` value is relevant for this contract
  /// @return answer as well as other values inline with the AggregatorV3Interface
  function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80) {
    uint80 roundId = 36893488147419113128;
    uint256 startedAt = 1637588496;
    uint256 updatedAt = 1637588496;
    uint80 answeredInRound = 36893488147419113128;

    return (roundId, answer, startedAt, updatedAt, answeredInRound);
  }

  /// @notice Helper method to update the answer value
  /// @param _answer Property to which the current answer (price) should be set to
  /// @dev The value should be equal to ETH/USD price multiplied by 100,000,000
  function updateAnswer(int256 _answer) public {
    answer = _answer;
  }
}
