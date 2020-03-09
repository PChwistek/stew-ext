import React, { useState } from 'react'
import Menu from '../Menu'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="header">
      <div className="header header__content">
        <div>
          <img src={ '../../../assets/144x144.png'} className="header__logo" />
        </div>
        <div>
          <Menu setOpen={ setOpen } open={ open }/>
          <img src={ '../../../assets/more.png'} className="header__more" onClick={ () => setOpen(true) } />
        </div>
      </div>
      <hr className="divider" />
    </div>
  )
}