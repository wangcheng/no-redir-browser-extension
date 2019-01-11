import Snabbdom from 'snabbdom-pragma'
import {Rule} from '../../types'
import rulePreview from '../utils/rulePreview'

interface Props {
  rules: Rule[]
}

export default ({rules}: Props) => (
  <section>
    <h5>Rules</h5>
    <table className="u-full-width">
      <thead>
        <tr>
          <th>#</th>
          <th>hostEquals</th>
          <th>pathEquals</th>
          <th>key</th>
          <th>preview</th>
          <th>action</th>
        </tr>
      </thead>
      {rules.map((r, index) => (
        <tr key={r.id}>
          <td>{index + 1}</td>
          <td>
            <code>{r.filter.hostEquals}</code>
          </td>
          <td>
            <code>{r.filter.pathEquals}</code>
          </td>
          <td>
            <code>{r.key}</code>
          </td>
          <td>
            <code>{rulePreview(r)}</code>
          </td>
          <td>
            <button className="js-button-delete-rule" data-id={r.id}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </table>
  </section>
)
