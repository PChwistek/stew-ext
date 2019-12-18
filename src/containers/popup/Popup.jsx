import React, { Component } from 'react'
// import PropTypes from 'prop-types'
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
    console.log('create tab should be visible')
    const { createVisible } = this.state
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
        <div>
          <CreateTab visible={ createVisible } wasOpened={ wasOpened } onCloseClick={ this.toggleCreateTab } />
          <Search onPlusClick={ this.toggleCreateTab } />
          <Table />
        </div>
      </div>
    )
  }
}


Popup.propTypes = {
}