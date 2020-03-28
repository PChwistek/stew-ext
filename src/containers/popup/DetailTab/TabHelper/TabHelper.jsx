import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from "react-transition-group"

import question from 'Assets/question.png'

export default function TabHelper(props) {
  return (
    <CSSTransition in={ props.in } timeout={ 200 } classNames={ 'tabhelper-anim' } unmountOnExit>
      <div className='tabhelper'>
        <div className='tabhelper__container'>
          <div className='tabhelper__title'>
            { props.title }
            <div style={ {'marginLeft': 'auto' } } className={ 'tooltip' }>
              <img src={ question } className={'tabhelper__help-icon'} />
              <span className="tooltiptext tooltiptext--left"> { props.tooltipText } </span>
            </div>
          </div>
          { props.children }
          <div className='tabhelper__buttons'>
            <div className='tabhelper__button tabhelper__button--yes' onClick={ props.onYesClick }>
              Yes!
            </div>
            <div className='tabhelper__button tabhelper__button--no' onClick={ props.onNoClick } >
              No, thanks.
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}

TabHelper.propTypes = {
  onYesClick: PropTypes.func,
  onNoClick: PropTypes.func,
  tooltipText: PropTypes.string,
}