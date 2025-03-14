import { Timelock__factory } from "@council/typechain";
import { Interface } from "ethers/lib/utils";
import signale from "signale";
import { requiredArray } from "src/options/utils/requiredArray";
import { createCommandModule } from "src/utils/createCommandModule";

export const { command, describe, builder, handler } = createCommandModule({
  command: "execute [OPTIONS]",
  describe: "Encode call data for Timelock.execute",

  builder: (yargs) => {
    return yargs.options({
      t: {
        alias: ["targets"],
        describe: "A list of target addresses the timelock contract will call",
        type: "array",
        string: true,
      },
      d: {
        alias: ["calldatas"],
        describe: "Execution call data for each target",
        type: "array",
        string: true,
      },
    });
  },

  handler: async (args) => {
    const targets = await requiredArray(args.targets, {
      name: "targets",
      message: "Enter target addresses",
    });

    const calldatas = await requiredArray(args.calldatas, {
      name: "calldatas",
      message: "Enter call data for each target",
    });

    signale.success(encodeExecute(targets, calldatas));
  },
});

export function encodeExecute(targets: string[], calldatas: string[]): string {
  const timelockInterface = new Interface(Timelock__factory.abi);
  return timelockInterface.encodeFunctionData("execute", [targets, calldatas]);
}
