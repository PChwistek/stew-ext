import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from "react-transition-group"

export default function TimedAlert(props) {
  return (
    <CSSTransition in={ props.visible } timeout={ 200 } classNames={ 'timedalert-anim' } unmountOnExit>
      <div className='timedalert'>
        { props.text }
      </div>
    </CSSTransition>
  )
}

TimedAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  text: PropTypes.string
}

