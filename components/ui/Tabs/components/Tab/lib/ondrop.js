import { dragOver } from '../style.scss'


export function ondrop( vnode ) {
  return async e => {
    e.redraw = false
    e.target.classList.remove( dragOver )

    // Get tab IDs.
    const
      dragged = vnode.attrs.draggedTabID(),
      target = vnode.attrs.targetTabID()

    // Do nothing if the tab is dropped on itself.
    if ( dragged === target ) return

    await vnode.attrs.dropCallback?.( e, dragged, target )
  }
}
