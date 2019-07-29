import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
        Hello world, this is the popup.
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