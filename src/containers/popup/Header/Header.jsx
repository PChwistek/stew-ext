import React, { useState } from 'react'
import Menu from 'Popup/Menu'
import { trackViewSettings } from '../../analytics'

import logo from 'Assets/s-letter.png'
import more from 'Assets/more.png'

export default function Header() {
  const [open, setOpen] = useState(false)

  function onOpen() {
    setOpen(true)
    trackViewSettings()
  }

  return (
    <div className="header">
      <div className="header header__content">
        <div>
          <img src={ logo } className="header__logo" />
        </div>
        <div>
          <Menu setOpen={ setOpen } open={ open }/>
          <img src={ more } className="header__more" onClick={ () => onOpen() } />
        </div>
      </div>
      <hr className="divider" />
    </div>
  )
}