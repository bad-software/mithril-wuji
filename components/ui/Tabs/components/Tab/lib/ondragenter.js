import { dragOver } from '../style.scss'


export function ondragenter( vnode ) {
  return e => {
    e.redraw = false

    // Set target tab ID.
    vnode.attrs.targetTabID( e.target.dataset.id )

    // Style and set the drop effect if the tabs are different.
    if ( vnode.attrs.draggedTabID() !== vnode.attrs.targetTabID()) {
      e.target.classList.add( dragOver )
      e.dataTransfer.dropEffect = 'move'
    }
  }
}
