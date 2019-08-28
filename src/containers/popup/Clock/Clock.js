import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../common-ui/Button'

import './clock.scss'

export default class Clock extends Component {
  render() {
    const { time, activeSession, paused, stopTimer, startTimer, resumeTimer, pauseTimer, endEarly } = this.props
    return (
      <div className="clock clock__container">
        <p className="clock__time">  { activeSession ? time: '40:00' } </p>
        {
          activeSession 
            ? <div className="clock__pause-container">
              <Button text={ paused ? 'Resume' : 'Pause' } type={ 'secondary' } onClick={ paused ? resumeTimer : pauseTimer } />
            </div>
            :  <div className="clock__pause-container">
              <Button text={ 'Start' } type={ 'primary' } onClick={ activeSession ? stopTimer : () => startTimer(4000) } />
            </div>
        }
        { activeSession && <p className="clock__early" onClick={ endEarly }> End Early </p> }
      </div>
    )
  }
}

Clock.propTypes = {
  time: PropTypes.string,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  resumeTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
  endEarly: PropTypes.func,
  paused: PropTypes.bool,
  activeSession: PropTypes.bool
}