import m from 'mithril'
import { Card } from '#Components/cards/index.js'
import { Icon } from '#Components/svg/index.js'
import { menuState } from './handlers.js'

import {
  body,
  icon,
  menu,
  menu_item,
  menu_item__disabled,
  menu_item_label,
} from './style.scss'


const
  _ContextMenu = `.${body}`,
  _MenuItem = `.${menu_item}`,
  MenuItemDisabled = `.${menu_item}.${menu_item__disabled}`,
  MenuItemLabel = `span.${menu_item_label}`


// Menu offset in pixels
const offset = 4


export function ContextMenu() {
  let
    isOpen = false,
    menuItems = [],
    x = 0,
    y = 0

  menuState.map( state => {
    if ( state ) {
      const { e, menu } = state

      isOpen = true
      menuItems = menu

      x = x < innerWidth * 0.5
        ? e.clientX - offset
        : e.clientX + offset

      y = e.clientY
    } else {
      isOpen = false
      menuItems = []
    }

    m.redraw()
  })

  return {
    view() { return menuState() && m( _ContextMenu, [
      m( Card,
        {
          class: `${menu}`,
          role: 'menu',
          // Contain within window.
          style: `--left: ${x}px; --top: ${y}px; --transform-x: ${
            x < innerWidth * 0.5
              ? '0'
              : '-100%'
          }; --transform-y: ${
            y < innerHeight * 0.5
              ? '0'
              : '-100%'
          };`
        },
        // Items
        menuItems
          .filter( x => x )
          .map( item => m( menuItemComponents[ item.length ], { item })),
      )
    ])}
  }
}


const MenuItem = {
  view( v ) { return m( _MenuItem, { onclick: v.attrs.item[1]}, [
    m( Icon, { class: icon, name: 'empty' }),
    m( MenuItemLabel, v.attrs.item[0]),
  ])},
}


const MenuItemWithIcon = {
  view( v ) { return m(
    v.attrs.item[3]?.disabled
      ? MenuItemDisabled
      : _MenuItem,
    {
      disabled: !!v.attrs.item[3]?.disabled,
      onclick: v.attrs.item[2]
    },
    [
      m( Icon, { class: icon, name: v.attrs.item[0]}),
      m( MenuItemLabel, v.attrs.item[1]),
    ]
  )},
}


// Use item length to decide component.
const menuItemComponents = {
  2: MenuItem,
  3: MenuItemWithIcon,
  4: MenuItemWithIcon,
}


export { closeContextMenu, openContextMenu } from './handlers'
