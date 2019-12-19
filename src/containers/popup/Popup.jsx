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