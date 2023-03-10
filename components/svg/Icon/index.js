import m from 'mithril'
import { body, noMargin } from './style.scss'


const
  // Get keys and paths for icons.
  context = import.meta.webpackContext( '#Assets/icons', {
    recursive: true,
    regExp: /\.svg$/,
  }),
  keys = context.keys(),
  paths = keys.map( context ),

  _Icon = `svg.${body}`


export const Icon = {
  src: '',
  oninit({ attrs: { name, src }}) {
    // Get source from provided name, if present.
    if ( name )
      this.src = paths[ keys.indexOf( `./${name}.svg` )]

    // Otherwise, use the provided source.
    else this.src = src
  },

  view({ attrs }) { return m( attrs.noDefault ? 'svg' : _Icon,
    {
      // Pass through attributes.
      ...attrs,

      // Apply styles.
      class: `${
        attrs.noMargin ? noMargin : ''
      } ${
        attrs.class || attrs.className || ''
      }`,
      className: undefined,
      noMargin: undefined,

      // Clear parent attributes.
      src: undefined,
    },
    m( 'use', { href: `${this.src}#icon` }),
  )}
}
