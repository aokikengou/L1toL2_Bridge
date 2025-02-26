import Web3 from "web3";
import dotenv from 'dotenv';
import ABI from "../artifacts/contracts/L1DepositContract.sol/L1DepositContract.json";
dotenv.config({ path: '../.env.local' });

// コントラクトアドレス
const L1DepositContractAddress = "0x336f5392db27461C29562150600D28cAf653346C";
const L2ContractAddress = "0x9B716a2Ced7d36BA1de3A1D781C10328E49B61d0";

async function setL2ContractAddress() {
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
        // トランザクションの送信
        const tx = await testContract.methods.setL2ReceiverContractAddress(L2ContractAddress).send({
            from: account.address,
            // value: amount,
            gas: '200000' // ガスリミットは適宜調整
        });

        console.log(tx)
    } catch (error) {
        console.error('Error:', error);
    }
}

// スクリプトを実行
setL2ContractAddress();
