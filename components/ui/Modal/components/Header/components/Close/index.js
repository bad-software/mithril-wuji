import m from 'mithril'
import { body } from './style.scss'


const _Close = `button.${body}`


export const Close = {
  view( v ) { return m( _Close, { onclick: v.attrs.resolve })}
}
