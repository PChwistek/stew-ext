import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from "react-transition-group"


export default function TabHelper(props) {
  const{ currentTab } = props
  return (
    <CSSTransition in={ props.in } timeout={ 200 } classNames={ 'tabhelper-anim' } unmountOnExit>
      <div className='tabhelper'>
        <div className='tabhelper__container'>
          <div className='tabhelper__title'>
            Quick Add
            <div style={ {'marginLeft': 'auto' } } className={ 'tooltip' }>
              <img src={ '../../../../assets/question.png' } className={'tabhelper__help-icon'} />
              <span className="tooltiptext tooltiptext--left"> { 'Allows you to add the currently active tab.' } </span>
            </div>
          </div>
          <div>
            <a href={ currentTab.url } target="blank">
              <div className='tab__body'>
                <img src={ currentTab.favIconUrl || '../../../assets/chrome.png' } className='tab__fav' />
                <p className='tab__title'> { currentTab.title } </p>
              </div>
            </a>
          </div>
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
}