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
    this.props.addCount()
    this.props.startTimer().then(data => console.log('from bg', data)).catch((err) => console.log(err))
  }

  render() {
    const { goToDashboard } = this.props
    return (
      <div className="popup" onClick={ goToDashboard }>
        Hello world, this is the popup.
      </div>
    )
  }
}


Popup.propTypes = {
  goToDashboard: PropTypes.func,
  dispatch: PropTypes.func,
  addCount: PropTypes.func,
  startTimer: PropTypes.func,
}