import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../common-ui/Button'

import './clock.scss'

export default class Clock extends Component {
  render() {
    const { time } = this.props
    return (
      <div className="clock clock__container">
        <p className="clock__time">  { time } </p>
        <div className="clock__pause-container">
          <Button text={ 'Pause' } type={ 'secondary' }/>
        </div>
        <p className="clock__early"> End Early </p>
      </div>
    )
  }
}

Clock.propTypes = {
  time: PropTypes.string,
  paused: PropTypes.bool,
  activeSession: PropTypes.bool
}