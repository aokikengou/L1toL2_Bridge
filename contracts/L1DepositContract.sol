// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IStandardBridge {
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;
}

contract L1DepositContract is Ownable {
    address public standardBridgeAddress; // L1StandardBridgeProxyのアドレス
    address public l2ReceiverContractAddress; // L2でERC20トークンを発行するコントラクトのアドレス

    constructor(address initialOwner, address _standardBridgeAddress) 
        Ownable(initialOwner) {
        standardBridgeAddress = _standardBridgeAddress;
    }

    // L1のコントラクトをデプロイ時にL2のコントラクトアドレスが不明なため、後から設定可能とする
    function setL2ReceiverContractAddress(address _l2ReceiverContractAddress) external onlyOwner {
        l2ReceiverContractAddress = _l2ReceiverContractAddress;
    }

    function depositETH() external payable {
        require(msg.value > 0, "deposit amount must be greater than 0");
        require(l2ReceiverContractAddress != address(0), "L2 receiver contract address is not set");

        // L2のmintTokens関数を呼び出すためのデータエンコード
        bytes memory data = abi.encodeWithSignature(
            "mintTokens(address,uint256)", msg.sender, msg.value
        );

        // ブリッジ前に設定値確認用のログ出力
        emit DepositDetails(standardBridgeAddress, l2ReceiverContractAddress, msg.sender, msg.value);

        // L1StandardBridgeProxyを経由してブリッジ
        IStandardBridge(standardBridgeAddress).depositETHTo{ value: msg.value }(
            l2ReceiverContractAddress,
            3000000, // L2のガスリミット
            data
        );

        emit Deposited(msg.sender, msg.value);
    }

    event Deposited(address indexed sender, uint256 amount);

    // ログ出力用
    event DepositDetails(address indexed bridgeAddress, address indexed receiverAddress, address indexed sender, uint256 amount);
}