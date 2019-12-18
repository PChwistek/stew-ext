import React from 'react'
import PropTypes from 'prop-types'

export default function SlideIn(props) {
  const { visible, onCloseClick } = props
  console.log('Create tab', visible)

  function getAnimation() {
    const { visible, wasOpened } = props
    if(visible) {
      return 'slide-in slide-in--visible'
    } else if(!visible && wasOpened) {
      return 'slide-in slide-in--hide'
    }
    return 'slide-in'

  }

  return (
    <div className={ getAnimation() }>
      <div className={'slide-in-filler'}>

      </div>
      <div className='slide-in-content'>
        <div>
          <img src={ '../../../assets/close.png'} className='slide-in-button'  onClick={ onCloseClick } />
          <h1 className='slide-in-content__title'> { props.title } </h1> 
        </div>
        <div className='slide-in-content slide-in-content__body'>
          { props.children }
        </div>
      </div>
    </div>
  )
}

SlideIn.propTypes = {
  visible: PropTypes.bool.isRequired,
  wasOpened: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
}