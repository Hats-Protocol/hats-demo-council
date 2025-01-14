import colors from "colors";
import prompts from "prompts";
import { isNotEmptyList } from "src/utils/validation/isNotEmptyList";
import { requiredOption } from "./requiredOption";
import { UntypedQuestion } from "./types";

export type ArrayQuestion = Omit<UntypedQuestion, "separator">;

export async function requiredArray(
  value: string[] | undefined,
  question: ArrayQuestion,
  options?: prompts.Options,
): Promise<string[]> {
  return requiredOption(
    value,
    {
      validate: isNotEmptyList,
      ...question,
      type: "list",
      separator: " ",
      message: `${question.message} ${colors.dim("(space separated)")}`,
    },
    options,
  );
}
