import React, { useState } from 'react'
import Menu from '../Menu'

import logo from 'Assets/144x144.png'
import more from 'Assets/more.png'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="header">
      <div className="header header__content">
        <div>
          <img src={ logo } className="header__logo" />
        </div>
        <div>
          <Menu setOpen={ setOpen } open={ open }/>
          <img src={ more } className="header__more" onClick={ () => setOpen(true) } />
        </div>
      </div>
      <hr className="divider" />
    </div>
  )
}