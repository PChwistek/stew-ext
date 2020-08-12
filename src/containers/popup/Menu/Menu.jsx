import React, { useRef, useState } from "react"
import PropTypes from 'prop-types'
import Switch from "react-switch"
import { CSSTransition } from "react-transition-group"

import stewLogo from 'Assets/stew-title.png'
import teamAd from 'Assets/new-team.png'
import question from 'Assets/question.png'

const Menu = (props) => {
  const node = useRef()
  const { settings } = props
  const [quickAdd, setQuickAdd] = useState(settings.quickAdd)
  const [mergeHelper, setMergeHelper] = useState(settings.mergeHelper)
  const [cleanWorkspace, setCleanWorkspace] = useState(settings.cleanWorkspace)

  function handleWorkspaceChange(checked) {
    setCleanWorkspace(checked)
    props.setSettings({
      cleanWorkspace: checked,
      quickAdd,
      mergeHelper
    })
  }

  function handleQuickAddChange(checked) {
    setQuickAdd(checked)
    props.setSettings({
      cleanWorkspace,
      quickAdd: checked,
      mergeHelper
    })
  }

  function handleMergeHelperChange(checked) {
    setMergeHelper(checked)
    props.setSettings({
      cleanWorkspace,
      quickAdd,
      mergeHelper: checked,
    })
  }

  return (
    <CSSTransition in={ props.open } timeout={ 200 } className='menu' classNames={ 'slide-in' } unmountOnExit>
      <div ref={ node } className={ 'menu' }>
        <div className={ 'menu__blank-zone'} onClick={ () => props.setOpen(false) } />
        <div className={ 'menu__body'}>
          <div className={ 'menu__body__content'}>
            <div>
              <img src={ stewLogo } className={ 'menu__body__logo' } />
            </div>
            Version 1.0.6
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
                  <Switch onChange={ handleWorkspaceChange } checked={ cleanWorkspace } className='menu__switch' offColor='#EE6352' onColor='#55C090' />
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
                  <Switch onChange={ handleQuickAddChange } checked={ quickAdd } className='menu__switch' offColor='#EE6352' onColor='#55C090' />
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
                  <Switch onChange={ handleMergeHelperChange } checked={ mergeHelper } className='menu__switch' offColor='#EE6352' onColor='#55C090' />
                </label>
              </div>
            </div>
            <div onClick={ props.logout } className='menu__body__logout-container'>
              <a className='menu__body__logout-text'> Logout </a>
            </div>
            <div className='menu__body__footer'>
              <img src={ teamAd } className='menu__body__footer__icon'/>
              <p className='menu__body__footer__ad-text-container'>
                <a target='blank' href='https://getstew.com/about-teams' className='menu__body__footer__ad-text'>  Learn about Stew for teams  </a>
              </p>
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