import m from 'mithril'
import { makePromise } from '@soulofmischief/async.js'
import { Header } from './components/Header/index.js'
import { body, modal, overlay } from './style.scss'


const resolves = new Set()


/**
 * Open a modal.
 *
 * @param {function} component - The component to render
 * @param {object} options - Modal options
 * @param {boolean} options.close - Whether to show a close button
 * @param {string} options.title - Titlebar contents
 * @param {object} options.attrs - Attributes to pass to the component
 */
export async function openModal(
  component,
  { close = false, title = '', ...attrs } = {}
) {
  const
    // Create rendering context.
    root = document.createElement( 'div' ),

    // Create promise for async resolution.
    { resolve, promise } = makePromise()

  // Add to resolves.
  resolves.add( resolve )

  // Prevent overscroll.
  document.body.classList.add( 'overscroll-contain' )

  // Mount context and dynamic component.
  m.mount( root, {
    view() { return m( '', { class: body }, [
      // Overlay
      m( '', { class: overlay, onclick: resolve }),

      // Modal
      m( '', { class: modal }, [
        m( Header, { close, resolve, title }),
        m( component, { ...attrs, resolve }),
      ]),
    ])},
  })

  document.body.appendChild( root )

  // TODO: Blur main rendering context.

  // Wait for resolution.
  await promise

  // Remove from resolves.
  resolves.delete( resolve )

  // Unmount context and component.
  m.mount( root, null )
  document.body.removeChild( root )

  // Restore overscroll behavior.
  document.body.classList.remove( 'overscroll-contain' )

  return promise
}


function closeAllListener( e ) {
  // Resolve all modals.
  resolves.forEach( resolve => resolve( true ))
}
