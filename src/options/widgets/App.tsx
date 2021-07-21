import Snabbdom from "snabbdom-pragma";
import { Options } from "../../types";
import RuleList from "./RuleList";
import RuleForm from "./RuleForm";
import Miscellaneous from "./Miscellaneous";
import About from "./About";
import SmartUrlParserForm from "./SmartUrlParserForm";

interface AppProps {
  options: Options;
}

export default ({ options }: AppProps) => (
  <div className="container">
    <h1>Options</h1>
    <SmartUrlParserForm />
    <RuleForm />
    <RuleList rules={options.rules} />
    <Miscellaneous showNotification={options.showNotification} />
    <About />
  </div>
);
