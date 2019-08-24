import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navigation from './navigation'
import TaskView from './taskview'
import Clock from './Clock'
import ConnectedDevices from './ConnectedDevices'
import './popup.scss'

/*
  document.getElementById("stats-link").addEventListener("click", () => {
      browser.tabs.create({ url: "/stats/stats.html" });
    });
*/

export class Popup extends Component {
  
  componentDidMount() {
  }

  render() {
    return (
      <div className="popup">
        <div className="popup__container">
          <Navigation />
          <TaskView projectTitle={ 'thesis' } taskName={ 'write chapter 2' } />
          <Clock time={ '25:39' } />
          <div className="popup__connected-text"> Connected devices </div>
          <div className="popup__connected-container">
            <ConnectedDevices connected={ [ { device:'iPhone' }, { device: 'iPad'} ]} actionOnClick={ () => {} }/>
          </div>
        </div>
      </div>
    )
  }
}


Popup.propTypes = {
  goToDashboard: PropTypes.func,
  addCount: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func
}