// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IL1CrossDomainMessenger {
    function sendMessage(
        address target,
        bytes calldata message,
        uint32 gasLimit
    ) external;
}

contract L1DepositContract is Ownable {
    address public crossDomainMessengerAddress; // L1CrossDomainMessengerProxyのアドレス
    address public l2ReceiverContractAddress; // L2でERC20トークンを発行するコントラクトのアドレス

    constructor(address initialOwner, address _crossDomainMessengerAddress) 
        Ownable(initialOwner) {
        crossDomainMessengerAddress = _crossDomainMessengerAddress;
    }

    // L1のコントラクトをデプロイ時にL2のコントラクトアドレスが不明なため、後から設定可能とする
    function setL2ReceiverContractAddress(address _l2ReceiverContractAddress) external onlyOwner {
        l2ReceiverContractAddress = _l2ReceiverContractAddress;
    }

    function depositETH() external payable {
        require(msg.value > 0, "deposit amount must be greater than 0");
        require(l2ReceiverContractAddress != address(0), "L2 receiver contract address is not set");

        // ブリッジ前に設定値確認用のログ出力
        emit DepositDetails(crossDomainMessengerAddress, l2ReceiverContractAddress, msg.sender);

        // L2のmintTokens関数を呼び出すためのデータエンコード
        bytes memory data = abi.encodeWithSignature(
            "mintTokens(address,uint256)", msg.sender, msg.value
        );

        // L1CrossDomainMessengerProxyを経由してL2にメッセージ送信
        IL1CrossDomainMessenger(crossDomainMessengerAddress).sendMessage({
            target: l2ReceiverContractAddress,
            message: data,
            gasLimit: 2000000 // L2のガスリミット
        });

        emit Deposited(msg.sender, msg.value);
    }

    event Deposited(address indexed sender, uint256 amount);

    // ログ出力用
    event DepositDetails(address indexed messengerAddress, address indexed receiverAddress, address indexed sender);
}