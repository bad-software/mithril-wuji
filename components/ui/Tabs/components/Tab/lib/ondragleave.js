import { dragOver } from '../style.scss'


export function ondragleave( e ) {
  e.redraw = false
  e.target.classList.remove( dragOver )
}
