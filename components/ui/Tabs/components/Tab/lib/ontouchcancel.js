
export function ontouchcancel( vnode ) {
  return async e => {
    e.redraw = false
    vnode.attrs.draggedTabID( null )
    vnode.attrs.targetTabID( null )
  }
}
