import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const L2ERC20TokenModule = buildModule("L2ERC20TokenModule", (m) => {
  const L2ERC20Token = m.contract("L2ERC20Token",[
    "0x336f5392db27461C29562150600D28cAf653346C", // L1のDepositContractのアドレス
    "0x4200000000000000000000000000000000000007"  // L2のCrossDomainMessengerのアドレス
  ]);

  return { L2ERC20Token };
});

export default L2ERC20TokenModule;
