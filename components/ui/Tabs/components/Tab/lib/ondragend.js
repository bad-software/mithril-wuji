
export function ondragend( vnode ) {
  return async e => {
    e.redraw = false

    // Reset dragged tab ID.
    vnode.attrs.draggedTabID( null )
  }
}
