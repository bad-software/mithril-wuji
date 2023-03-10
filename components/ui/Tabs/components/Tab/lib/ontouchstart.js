import { touch } from '../style.scss'


export function ontouchstart( vnode ) {
  return async e => {
    e.preventDefault()
    e.redraw = false
    vnode.attrs.draggedTabID( vnode.attrs.id )

    // Highlight dragged tab.
    e.target.classList.add( touch )

    await vnode.attrs.dragStartCallback?.( e, vnode.attrs.id )
  }
}
