import m from 'mithril'
import stream from 'mithril/stream'
import { AddTab } from './components/AddTab/index.js'
import { Tab } from './components/Tab/index.js'
import { body } from './style.scss'


// Globally track tabs in order to allow switching tabs in-between instances.
const
  draggedTabID = stream( null ),
  targetTabID = stream( null ),

  _Tabs = `nav.${body}`

// Redraw when a tab is dragged.
draggedTabID.map(() => m.redraw())


// TODO:
//  - Draggable
//  - Add button, becomes delete on drag

export function Tabs() {
  return {
    view( v ) { return m( _Tabs, [
      // Tab: [ Name, ID ]
      v.attrs.tabs.map(( tab, i ) =>
        m( Tab, {
          draggedTabID,
          targetTabID,
          activeIndex: v.attrs.index,
          id: tab[1],
          index: i,
          key: tab[1],
          name: tab[0],

          // Callbacks
          deleteCallback: v.attrs.deleteCallback,
          //dragCallback: v.attrs.dragCallback,
          //dragStartCallback: v.attrs.dragStartCallback,
          dropCallback: v.attrs.dropCallback,
        })
      ),
      m( AddTab, {
        draggedTabID,
        targetTabID,
        addCallback: v.attrs.addCallback,
        deleteCallback: v.attrs.deleteCallback,
      }),
    ])}
  }
}
