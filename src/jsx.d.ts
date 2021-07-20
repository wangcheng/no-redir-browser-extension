import { VNode, VNodeData } from "snabbdom";

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface IntrinsicElements {
      [elemName: string]: VNodeData;
    }
  }
}
