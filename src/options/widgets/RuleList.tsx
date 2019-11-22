import Snabbdom from 'snabbdom-pragma'
import {Rule} from '../../types'

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
          <th>pattern</th>
          <th>key</th>
          <th>template</th>
          <th>action</th>
        </tr>
      </thead>
      {rules.map((r, index) => (
        <tr key={r.id}>
          <td>{index + 1}</td>
          <td>
            <code>{r.pattern}</code>
          </td>
          <td>
            <code>{r.key}</code>
          </td>
          <td>
            <code>{r.template || 'null'}</code>
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
