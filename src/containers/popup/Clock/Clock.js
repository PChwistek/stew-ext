import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../common-ui/Button'

import './clock.scss'

export default class Clock extends Component {
  render() {
    console.log(this.props)
    const { time, activeSession, stopTimer, startTimer } = this.props
    return (
      <div className="clock clock__container">
        <p className="clock__time">  { activeSession ? time: '40:00' } </p>
        <div className="clock__pause-container">
          <Button text={ activeSession ? 'Pause' : 'Start' } type={ activeSession ? 'secondary' : 'primary' } onClick={ activeSession ? stopTimer : () => startTimer(4000) } />
        </div>
        { activeSession && <p className="clock__early"> End Early </p> }
      </div>
    )
  }
}

Clock.propTypes = {
  time: PropTypes.string,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  paused: PropTypes.bool,
  activeSession: PropTypes.bool
}