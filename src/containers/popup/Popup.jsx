import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Search from './Search'
import Table from './Table'
import CreateTab from './CreateTab'
import './popup.scss'

/*
  document.getElementById("stats-link").addEventListener("click", () => {
      browser.tabs.create({ url: "/stats/stats.html" });
    });
*/

export class Popup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      createVisible: false,
      wasOpened: false,
    }
  }

  toggleCreateTab = () => {
    const { createVisible } = this.state
    const { getCurrentTabs } = this.props
    
    if(!createVisible) {
      getCurrentTabs()
    }

    this.setState({
      createVisible: !createVisible,
      wasOpened: true
    })

  }


  render() {
    const { createVisible, wasOpened } = this.state
    return (
      <div className="popup">
        <Header />
        <div className="popup__body">
          <CreateTab visible={ createVisible } wasOpened={ wasOpened } onCloseClick={ this.toggleCreateTab } />
          <Search onPlusClick={ this.toggleCreateTab } />
          <Table />
        </div>
      </div>
    )
  }
}


Popup.propTypes = {
  getCurrentTabs: PropTypes.func,
}