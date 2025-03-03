import Web3 from "web3";
import dotenv from 'dotenv';
import ABI from "../artifacts/contracts/L2ERC20Token.sol/L2ERC20Token.json";
dotenv.config({ path: '../.env.local' });

// コントラクトアドレス
const L2ERC20TokenAddress = "0x81aA8D2605d8231f944FAC32381545A22A911B8B";

async function Burn(_amount: string) {
    const amount = Web3.utils.toWei(_amount, 'ether');
    // RPCのエンドポイントを設定
    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_opsepolia_URL as string);

    // アカウントをプライベートキーから作成
    const formattedPrivateKey = `0x${process.env.PRIVATE_KEY as string}`;

    const account = web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    // コントラクトのインスタンスを作成
    const testContract = new web3.eth.Contract(ABI.abi, L2ERC20TokenAddress);

    try {
        // 適正なガスリミットを取得
        const gasLimit = await testContract.methods.burnAndWithdraw(amount).estimateGas({
            from: account.address,
        });

        // トランザクションの送信
        const tx = await testContract.methods.burnAndWithdraw(amount).send({
            from: account.address,
            // value: amount,
            gas: gasLimit.toString()
        });

        console.log(tx)
    } catch (error) {
        console.error('Error:', error);
    }
}

// スクリプトを実行
Burn('0.001');
