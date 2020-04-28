import React, { useRef } from "react"
import PropTypes from 'prop-types'
import Switch from "react-switch"
import { CSSTransition } from "react-transition-group"

import stewLogo from 'Assets/stew-title.png'
import question from 'Assets/question.png'

const Menu = (props) => {
  const node = useRef()

  return (
    <CSSTransition in={ props.open } timeout={ 200 } className='menu' classNames={ 'slide-in' } unmountOnExit>
      <div ref={ node } className={ 'menu' }>
        <div className={ 'menu__blank-zone'} onClick={ () => props.setOpen(false) } />
        <div className={ 'menu__body'}>
          <div className={ 'menu__body__content'}>
            <div>
              <img src={ stewLogo } className={ 'menu__body__logo' } />
            </div>
            version 0.5
            <div className='menu__body__switches'>
              <div className='menu__body__switch-container'>
                <label>
                  <span> 
                    <div className={ 'tooltip' }>
                      <img src={ question } className={'menu__help-icon'} />
                      <span className="tooltiptext tooltiptext__menu--left"> Removes all open tabs and replaces them with the recipe. </span>
                    </div>
                    Clean workspace 
                  </span>
                  <Switch onChange={ () => {} } checked={ false } className='menu__switch' offColor='#EE6352' onColor='#55C090' />
                </label>
              </div>
              <div className='menu__body__switch-container'>
                <label>
                  <span> 
                    <div className={ 'tooltip' }>
                      <img src={ question } className={'menu__help-icon'} />
                      <span className="tooltiptext tooltiptext__menu--left"> Enable quick add popup. </span>
                    </div>
                    Quick Add 
                  </span>
                  <Switch onChange={ () => {} } checked={ true} className='menu__switch' offColor='#EE6352' onColor='#55C090' />
                </label>
              </div>
              <div className='menu__body__switch-container'>
                <label>
                  <span> 
                      <div className={ 'tooltip' }>
                        <img src={ question } className={'menu__help-icon'} />
                        <span className="tooltiptext tooltiptext__menu--left"> Enable tab merge popup. </span>
                      </div>
                      Merge helper 
                  </span>
                  <Switch onChange={ () => {} } checked={ true} className='menu__switch' offColor='#EE6352' onColor='#55C090' />
                </label>
              </div>
            </div>
            <div onClick={ props.logout } className='menu__body__logout-container'>
              <a className='menu__body__logout-text'> Logout </a>
            </div>
            <div />
            <div />
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

Menu.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default Menu