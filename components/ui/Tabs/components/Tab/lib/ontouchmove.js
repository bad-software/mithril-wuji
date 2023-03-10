import { debounce } from '@soulofmischief/js-utils'


export const ontouchmove = debounce( async e => {
  //await v.attrs.dragCallback?.( e, v.attrs )

  const target = document.elementFromPoint(
    e.touches[ 0 ].clientX,
    e.touches[ 0 ].clientY,
  )

  // TODO: Find an idiomatic way to add and remove dragOver classes
  //  for touch events.
}, 100 )
