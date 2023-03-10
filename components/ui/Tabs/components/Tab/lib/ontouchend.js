import { body as addTab } from '../../AddTab/style.scss'
import { touch } from '../style.scss'


export function ontouchend( vnode ) {
  return async e => {
    e.redraw = false

    // Get tabs.
    const
      draggedID = vnode.attrs.draggedTabID(),
      target = document.elementFromPoint(
        e.changedTouches[ 0 ].clientX,
        e.changedTouches[ 0 ].clientY
      )

    // Delete tab if it was dropped on the add tab button.
    if ( target.classList.contains( addTab )) {
      await vnode.attrs.deleteCallback?.( draggedID )

      console.log( 'TARGET:', target.classList.contains( addTab ))
    }

    // Otherwise drop the tab.
    else {
      const targetID = target?.dataset.id

      if ( targetID ) {
        // Do nothing if the tab is dropped on itself.
        if ( draggedID === targetID ) return

        await vnode.attrs.dropCallback?.( e, draggedID, targetID )
      }
    }

    // Reset state.
    e.target.classList.remove( touch )
    vnode.attrs.draggedTabID( null )
  }
}
