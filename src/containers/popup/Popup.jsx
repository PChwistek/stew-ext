import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addCount, goToDashboard } from './popup.actions'

import './popup.scss'

/*
  document.getElementById("stats-link").addEventListener("click", () => {
      browser.tabs.create({ url: "/stats/stats.html" });
    });
*/

export class Popup extends Component {
  
  componentDidMount() {
    this.props.addCount()
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
}

const stateToProps = () => ({
  
})

const dispatchToProps = {
  goToDashboard,
  addCount,
}

export default connect(stateToProps, dispatchToProps)(Popup)
