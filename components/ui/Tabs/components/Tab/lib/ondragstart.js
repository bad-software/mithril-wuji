
export function ondragstart( vnode ) {
  return async e => {
    e.redraw = false

    // Set dragged tab ID.
    vnode.attrs.draggedTabID( vnode.attrs.id )

    // Set allowed drop effect.
    e.dataTransfer.effectAllowed = 'move'

    // Wait for callback.
    await vnode.attrs.dragStartCallback?.( e, vnode.attrs.id )
  }
}
