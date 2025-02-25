import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env.local' });

const L1DepositContractModule = buildModule("L1DepositContractModule", (m) => {
  const L1DepositContract = m.contract("L1DepositContract",[
    process.env.WALLET_ADDRESS as string, // L1DepositContractのowner
    "0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1" // L1StandardBridgeProxyのアドレス
  ]);

  return { L1DepositContract };
});

export default L1DepositContractModule;
