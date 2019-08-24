import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Clock extends Component {
  render() {
    return (
      <div>

      </div>
    )
  }
}

Clock.propTypes = {
  time: PropTypes.string,
  paused: PropTypes.bool,
  activeSession: PropTypes.bool
}