// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface IL2CorssDomainMessenger {
    function xDomainMessageSender() external view returns (address);
}

contract L2ERC20Token is ERC20 {
    address public l1DepositContractAddress; // L1のDepositContractのアドレス
    address public l2CrossDomainMessengerAddress; // L2のCrossDomainMessengerのアドレス

    constructor(
        address _l1DepositContractAddress,
        address _l2CrossDomainMessengerAddress
    ) ERC20("Bridge Test Token", "BTT") {
        l1DepositContractAddress = _l1DepositContractAddress;
        l2CrossDomainMessengerAddress = _l2CrossDomainMessengerAddress;
    }

    function mintTokens(address to, uint256 amount) external {
        // require(
        //     msg.sender == l2CrossDomainMessengerAddress,
        //     "Only the L2 CrossDomainMessenger can trigger minting" // L2のCrossDomainMessengerからのみ呼び出し可能
        // );

        // require(
        //     IL2CorssDomainMessenger(l2CrossDomainMessengerAddress).xDomainMessageSender() == l1DepositContractAddress,
        //     "Only the L1 deposit contract can trigger minting" // L1のDepositContractからのみ呼び出し可能
        // );

        _mint(to, amount);
    }

}