import React from 'react'
import logo from '../../../assets/hermitly.png'
import menu from '../../../assets/icons8-menu-vertical-50.png'

import './navigation.scss'

const Navigation = () => {
  return (
    <div className="navigation__container">
      <div>
        <img src={ logo } className="navigation__logo--img"/>
      </div>
      <div>
        <img src={ menu } className="navigation__menu--img"/>
      </div>
    </div>
  )
}

export default Navigation