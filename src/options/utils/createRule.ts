import { v4 as uuid } from "uuid";
import { Rule } from "../../types";
import { RuleFormElements } from "../widgets/RuleForm";

export default (form: HTMLFormElement) => {
  const elements = form.elements as RuleFormElements;
  const hostEquals = elements["host-equals"].value;
  const pathEquals = elements["path-equals"].value;
  const key = elements["key"].value;
  const rule: Rule = {
    id: uuid(),
    filter: {
      hostEquals,
      pathEquals,
    },
    key,
  };
  return rule;
};
