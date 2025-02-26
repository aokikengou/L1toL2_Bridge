import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const L1DepositContractModule = buildModule("L1DepositContractModule", (m) => {
  const L1DepositContract = m.contract("L1DepositContract",[
    process.env.WALLET_ADDRESS as string, // L1DepositContractのowner
    "0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef" // L1CrossDomainMessengerProxyのアドレス
  ]);

  return { L1DepositContract };
});

export default L1DepositContractModule;
