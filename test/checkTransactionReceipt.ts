import Web3, { Address } from "web3";

type Transaction = {
    from: string;
    to: string;
    value?: string;
    gas?: number;
    gasPrice?: string;
    data?: string;
}

// トランザクションハッシュ
const txHash = "0x2c9a87a0af83a80a72ed13db628ae706b46021100cba6832bfffca84ea51a951";

async function checkTransactionReceipt() {
    // RPCのエンドポイントを設定
    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_sepolia_URL as string);

    try {
        // トランザクションの送信
        const receipt = await web3.eth.getTransactionReceipt(txHash);
        if (receipt && !receipt.status) {
            console.error('Transaction failed:', receipt);
            try {
                const transaction = await web3.eth.getTransaction(txHash);
                console.log('Transaction details:', transaction);

                try {
                    const callParams:Transaction = {
                        from: transaction.from,
                        to: transaction.to as string,
                        value: transaction.value,
                        gas: transaction.gas as any,
                        gasPrice: transaction.gasPrice,
                        data: transaction.input
                    };

                    const call = await web3.eth.call(callParams, receipt.blockNumber);
                    console.log('Call details:', call);
                } catch (callError) {
                    console.error('Error fetching call details:', callError);
                }
            } catch (transactionError) {
                console.error('Error fetching transaction details:', transactionError);
            }
        } else {
            console.log('Transaction succeeded:', receipt);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// スクリプトを実行
checkTransactionReceipt();
