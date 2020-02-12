import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Search from './Search'
import Table from './Table'
import CreateTab from './CreateTab'
import './popup.scss'

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
    this.setState({
      createVisible: !createVisible,
      wasOpened: true
    })
    if(!createVisible) {
      getCurrentTabs()
    }
  }

  render() {
    const { nextRow, previousRow } = this.props
    const { createVisible, wasOpened } = this.state

    document.onkeydown = checkKey;
    function checkKey(e) {
      console.log('here!!')
      e = e || window.event;
      if (e.keyCode == '38') {
        previousRow()
      }
      else if (e.keyCode == '40') {
        nextRow()
      }
    }

    return (
      <div className="popup" tabIndex="0" onKeyPress={ this.handleKeyPress } >
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