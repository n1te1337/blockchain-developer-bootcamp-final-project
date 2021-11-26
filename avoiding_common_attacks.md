# Contract security measures

## SWC-103 (Floating pragma)

Specific compiler pragma `0.8.0` used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## SWC-105 (Unprotected Ether Withdrawal)

`withdraw` is protected with OpenZeppelin `Ownable`'s `onlyOwner` modifier.
