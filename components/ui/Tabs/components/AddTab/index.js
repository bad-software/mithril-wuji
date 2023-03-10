import m from 'mithril'
import { Icon } from '#Components/svg/Icon/index.js'
import { body, dragover, icon, icon__delete } from './style.scss'


const _AddTab = `button.${body}`


/**
 * Add a tab. Also serves as a delete target when dragging a tab.
 * TODO: Rename... but wait to make sure we won't use this for more things.
 */
export const AddTab = {
  view( v ) {
    return v.attrs.draggedTabID()
      ? m( _AddTab,
        {
          ondragover,

          ondragenter: e => { v.dom.classList.add( dragover )},
          ondragleave: e => { v.dom.classList.remove( dragover )},

          ondrop: async e => {
            e.redraw = false
            await v.attrs.deleteCallback?.( v.attrs.draggedTabID())
            v.dom.classList.remove( dragover )
          },
        },
        m( Icon, { class: icon__delete, name: 'delete', key: 'delete' })
      )

      : m( _AddTab,
        {
          ondragover,
          onclick: onclick( v.attrs.addCallback ),
        },
        m( Icon, { class: icon, name: 'add', key: 'add' })
      )
  }
}

function onclick( callback ) {
  return e => {
    e.preventDefault()
    callback()
  }
}

function ondragover( e ) {
  e.preventDefault()
  e.redraw = false
}
