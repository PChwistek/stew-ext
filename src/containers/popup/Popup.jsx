import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './popup.scss'

/*
  document.getElementById("stats-link").addEventListener("click", () => {
      browser.tabs.create({ url: "/stats/stats.html" });
    });
*/

export class Popup extends Component {
  
  componentDidMount() {
    this.props.dispatch({
      type: 'ADD_COUNT'
    })
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
  dispatch: PropTypes.func
}

export default connect()(Popup)


