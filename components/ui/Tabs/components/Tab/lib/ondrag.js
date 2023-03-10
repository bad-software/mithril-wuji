
export function ondrag( vnode ) {
  return async e => {
    e.redraw = false
    await vnode.attrs.dragCallback?.( e, vnode.attrs )
  }
}
