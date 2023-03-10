// Hooks
import stream from 'mithril/stream'
import { makePromise } from '@soulofmischief/async.js'


// Stream which tracks the state of the context menu.
export const menuState = stream( null )

let promise = stream()

// Track menu state and resolve previous promise when set to null.
// This could definitely be reorganized, but it works. :)
promise = menuState.map( state => {
  promise()?.resolve( true )
  return state ? makePromise() : null
})


export function closeContextMenu( e ) {
  e.preventDefault()
  e.stopPropagation()

  // Close.
  menuState( null )

  // Remove listener.
  removeEventListener( 'click', closeContextMenu )
}


export async function openContextMenu( e, menu ) {
  // Prevent default context menu from opening.
  e.preventDefault()
  e.stopPropagation()

  // Open.
  menuState({ e, menu })

  // Add listener (after a delay in order to debounce input).
  setTimeout(
    () => addEventListener(
      'click',
      closeContextMenu,
      { once: true }
    ),
    10
  )

  // Wait for menu to close.
  return await promise().promise
}
