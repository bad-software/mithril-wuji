import m from 'mithril'

import {
  //ondrag,
  ondragend,
  ondragenter,
  ondragleave,
  ondragover,
  ondragstart,
  ondrop,
  ontouchcancel,
  ontouchend,
  ontouchmove,
  ontouchstart,
} from './lib/index.js'

import { active, body } from './style.scss'


const
  _Tab = `.${body}`,
  ActiveTab = `.${body}.${active}`

// Show active tab when indexes match.
const components = {
  true: ActiveTab,
  false: _Tab,
}


export function Tab() {
  return {
    view( v ) { return m( components[
      v.attrs.index === v.attrs.activeIndex()
    ],
      {
        'data-id': v.attrs.id,
        'data-index': v.attrs.index,
        draggable: true,
        title: 'Switch tab',

        // Mouse events
        onclick: () => v.attrs.activeIndex( v.attrs.index ),

        // Drag events
        ondragleave,
        ondragover,
        /*ondrag: ondrag( v ) */
        ondragend: ondragend( v ),
        ondragenter: ondragenter( v ),
        ondragstart: ondragstart( v ),
        ondrop: ondrop( v ),

        // Touch events
        ontouchcancel: ontouchcancel( v ),
        ontouchend: ontouchend( v ),
        ontouchstart: ontouchstart( v ),

        ontouchmove: async e => {
          // Method is debounced, so we need to prevent redraw even if the
          // callback is skipped.
          e.redraw = false
          ontouchmove( e )
        },
      },

      v.attrs.name,
    )}
  }
}
