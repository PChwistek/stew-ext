import React, { useEffect, useRef } from "react"
import PropTypes from 'prop-types'
import { CSSTransition } from "react-transition-group"

const Menu = (props) => {
  const node = useRef()

  return (
    <CSSTransition in={ props.open } timeout={ 200 } className='menu' classNames={ 'slide-in' } unmountOnExit>
      <div ref={ node } className={ 'menu' }>
        <div className={ 'menu__blank-zone'} onClick={ () => props.setOpen(false) } />
        <div className={ 'menu__body'}>
          <div className={ 'menu__body__content'}>
            <div>
              <img src='../../../assets/stew-logo.png' className={ 'menu__body__logo' } />
            </div>
            version 0.5
            <div>
              (imagine other settings options here...)
            </div>
            <div onClick={ props.logout }>
              <a> Logout </a>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

Menu.propTypes = {
  setOpen: PropTypes.func.isRequired,
}

export default Menu