import { CoreVoting__factory } from "@council/typechain";
import { Interface, parseUnits } from "ethers/lib/utils";
import signale from "signale";
import { requiredNumber } from "src/options/utils/requiredNumber";
import { requiredNumberString } from "src/options/utils/requiredNumberString";
import { createCommandModule } from "src/utils/createCommandModule";

export const { command, aliases, describe, builder, handler } =
  createCommandModule({
    command: "set-default-quorum [OPTIONS]",
    aliases: ["setDefaultQuorum"],
    describe: "Encode call data for CoreVoting.setDefaultQuorum",

    builder: (yargs) => {
      return yargs.options({
        p: {
          alias: ["power", "quorum"],
          describe: "The new base quorum",
          type: "string",
        },
        d: {
          alias: ["decimals"],
          describe:
            "The decimal precision used by the contract. The quorum option will be multiplied by (10 ** decimals). For example, if quorum is 100 and decimals is 18, then the result will be 100000000000000000000",
          type: "number",
        },
      });
    },

    handler: async (args) => {
      const power = await requiredNumberString(args.power, {
        name: "power",
        message: "Enter new base quorum",
      });

      const decimals = await requiredNumber(args.decimals, {
        name: "decimals",
        message: "Enter decimal precision",
        initial: 18,
      });

      signale.success(encodeSetDefaultQuorum(power, decimals));
    },
  });

export function encodeSetDefaultQuorum(quorum: string, decimals = 0): string {
  const coreVotingInterface = new Interface(CoreVoting__factory.abi);
  return coreVotingInterface.encodeFunctionData("setDefaultQuorum", [
    parseUnits(quorum, decimals),
  ]);
}
