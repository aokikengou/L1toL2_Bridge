import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const L2ERC20TokenModule = buildModule("L2ERC20TokenModule", (m) => {
  const L2ERC20Token = m.contract("L2ERC20Token",[
    "0xD306C9f07C458A487682E8eca8dE6e90AdEb3d58", // L1のDepositContractのアドレス
    "0x4200000000000000000000000000000000000007"  // L2のCrossDomainMessengerのアドレス
  ]);

  return { L2ERC20Token };
});

export default L2ERC20TokenModule;
