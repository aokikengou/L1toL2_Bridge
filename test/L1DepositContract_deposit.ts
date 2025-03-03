import Web3 from "web3";
import dotenv from 'dotenv';
import ABI from "../artifacts/contracts/L1DepositContract.sol/L1DepositContract.json";
dotenv.config({ path: '../.env.local' });

// コントラクトアドレス
const L1DepositContractAddress = "0xD306C9f07C458A487682E8eca8dE6e90AdEb3d58";

async function Deposit(_amount: string) {
    const amount = Web3.utils.toWei(_amount, 'ether');
    // RPCのエンドポイントを設定
    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_sepolia_URL as string);

    // アカウントをプライベートキーから作成
    const formattedPrivateKey = `0x${process.env.PRIVATE_KEY as string}`;

    const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    // コントラクトのインスタンスを作成
    const testContract = new web3.eth.Contract(ABI.abi, L1DepositContractAddress);

    try {
        // 適正なガスリミットを取得
        const gasLimit = await testContract.methods.depositETH().estimateGas({
            from: account.address,
            value: amount,
        });

        // トランザクションの送信
        const tx = await testContract.methods.depositETH().send({
            from: account.address,
            value: amount,
            gas: gasLimit.toString()
        });

        console.log(tx)
    } catch (error) {
        console.error('Error:', error);
    }
}

// スクリプトを実行
Deposit('0.001');
