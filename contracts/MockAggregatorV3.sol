// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockAggregatorV3 {

  int256 public answer = 428190000000;

  function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80) {
    uint80 roundId = 36893488147419113128;
    uint256 startedAt = 1637588496;
    uint256 updatedAt = 1637588496;
    uint80 answeredInRound = 36893488147419113128;

    return (roundId, answer, startedAt, updatedAt, answeredInRound);
  }

  function updateAnswer(int256 _answer) public {
    answer = _answer;
  }
}
