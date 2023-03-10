import m from 'mithril'
import { Close } from './components/Close/index.js'
import { body, title } from './style.scss'


const
  _Header = `header.${body}`,
  Title = `h2.${title}`


export function Header() {
  return {
    view( v ) { return m( _Header, [
      m( Title, v.attrs.title ),
      v.attrs.close && m( Close, { resolve: v.attrs.resolve }),
    ])}
  }
}
