import React from 'react'

export default function Header() {
  return (
    <div className="header">
      <div className="header header__content">
        <div>
          <img src={ '../../../assets/144x144.png'} className="header__logo" />
        </div>
        <div>
          <img src={ '../../../assets/more.png'} className="header__more" />
        </div>
      </div>
      <hr className="divider" />
    </div>
  )
}