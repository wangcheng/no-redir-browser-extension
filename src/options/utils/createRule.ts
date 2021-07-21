import { v4 as uuid } from "uuid";
import { Rule } from "../../types";
import { RuleFormElements } from "../widgets/RuleForm";
import { SmartUrlParserFormElements } from "../widgets/SmartUrlParserForm";

export type RuleInput = Omit<Rule, "id">;

export function createRule({ filter, key }: RuleInput): Rule {
  return { id: uuid(), filter, key };
}

export function createRuleFromForm(form: HTMLFormElement) {
  const elements = form.elements as RuleFormElements;
  const hostEquals = elements["host-equals"].value;
  const pathEquals = elements["path-equals"].value;
  const key = elements["key"].value;
  return createRule({
    filter: {
      hostEquals,
      pathEquals,
    },
    key,
  });
}

function convertUrlToRule(urlStr: string): RuleInput | null {
  const { host, pathname, searchParams } = new URL(urlStr);
  let foundKey;
  for (const [key, value] of searchParams) {
    if (value.match(/^https?:\/\//)) {
      foundKey = key;
      break;
    }
  }
  if (!foundKey) {
    return null;
  }
  return {
    filter: {
      hostEquals: host,
      pathEquals: pathname,
    },
    key: foundKey,
  };
}

export function createRuleFromSmartUrlParserForm(form: HTMLFormElement) {
  const elements = form.elements as SmartUrlParserFormElements;
  const url = elements["url"].value;
  const ruleInput = convertUrlToRule(url);
  return ruleInput && createRule(ruleInput);
}
