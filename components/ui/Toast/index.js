import m from 'mithril'
import { makePromise } from '@soulofmischief/async.js'
import { configureStore } from '@soulofmischief/js-utils'
import { Card } from '#Components/cards'
import { body, card, item } from './style.scss'


const
  // HTML title for toast elements
  title = 'Clear notification',

  // Preserve toasts between routes.
  toastStore = { store: []}


/**
 * Toast component
 */
export function Toasts() {
  return {
    async oncreate({ dom }) {
      toastStore.store = configureStore([], dom ).store
    },

    view() { return (
      m( '#toast', { class: body }, toastStore.store
        .map( t =>
          m( Card,
            {
              class: card,
              title,
              key: t,
              onclick: () => Toast.remove( t ),
              role: 'alert',
            },
            m( '', { class: item, }, t.text )
          )
        )
      )
    )}
  }
}


/**
 *Toast manager
 */
export class Toast {
  constructor( str, duration = 6000 ) {
    this.text = str
    Object.assign( this, { duration }, makePromise())

    //noinspection JSIgnoredPromiseFromCall
    this._removeOnDone()
  }

  async _removeOnDone() {
    //noinspection JSUnresolvedVariable
    await this.promise
    Toast.remove( this )
    m.redraw()
  }

  /** Dispatch an add event. */
  static add( str, duration ) {
    const text = new Toast( str, duration )

    document
      .querySelector( '#toast' )
      .dispatchEvent( new CustomEvent( 'add', { detail: text }))

    //noinspection JSUnresolvedVariable
    setTimeout( text.resolve, text.duration )

    m.redraw()
    return text
  }

  /** Dispatch a remove event. */
  static remove( text ) {
    document
      .querySelector( '#toast' )
      .dispatchEvent( new CustomEvent( 'remove', { detail: text }))

    return text
  }

  /** Update a text's details. */
  static update( text, str ) {
    text.text = str
    return text
  }
}
