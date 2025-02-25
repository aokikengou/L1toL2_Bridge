import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const L2ERC20TokenModule = buildModule("L2ERC20TokenModule", (m) => {
  const L2ERC20Token = m.contract("L2ERC20Token",[
    "0x28290150389db1a66a756431c7EBc14f6A02b2F7", // L1のDepositContractのアドレス
    "0x4200000000000000000000000000000000000007"  // L2のCrossDomainMessengerのアドレス
  ]);

  return { L2ERC20Token };
});

export default L2ERC20TokenModule;
