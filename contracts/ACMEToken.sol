// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ACMEToken is ERC20 {
  constructor() ERC20("ACME Token", "ACME") {
    _mint(msg.sender, 1000000 * 10 ** 18);
  }
}
