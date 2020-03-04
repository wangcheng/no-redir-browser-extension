import Snabbdom from "snabbdom-pragma";

interface Props {
  showNotification: boolean;
}

export default ({ showNotification }: Props) => (
  <section>
    <h5>Miscellaneous</h5>
    <label>
      <input type="checkbox" id="checkbox" checked={showNotification} />{" "}
      <span className="label-body">
        Show notification for every interception.
      </span>
    </label>
    <div className="row">
      <button id="reset">Reset Factory Options</button>
    </div>
  </section>
);
