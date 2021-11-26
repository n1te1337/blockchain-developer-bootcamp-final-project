// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title ECR20 contract for ACME Token
/// @author Pav
/// @notice Pre-mines 1,000,000 tokens to be distributed by the vendor
contract ACMEToken is ERC20 {
  constructor() ERC20("ACME Token", "ACME") {
    _mint(msg.sender, 1000000 * 10 ** 18);
  }
}
