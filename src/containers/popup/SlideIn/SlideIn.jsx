import React from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

export default function SlideIn(props) {

  const { onCloseClick, visible } = props

  return (
    <CSSTransition in={ visible } timeout={ 200 } className='slide-in' classNames={ 'slide-in' } unmountOnExit>
      <div className='slide-in-content'>
        <div className='slide-in-content slide-in-content__body'>
        <div>
          <img src={ '../../../assets/close.png'} className='slide-in-button' onClick={ onCloseClick } />
        </div>
          { props.children }
        </div>
      </div>
    </CSSTransition>
  )
}

SlideIn.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.node
}