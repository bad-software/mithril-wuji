import m from 'mithril'

import { body } from './style.scss'


export const Card = {
  view({ attrs, children }) { return m( 'article',
    { ...attrs, class: `${body} ${attrs.class || attrs.className || ''}` },
    m( 'section', children ),
  )}
}
