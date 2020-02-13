import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Search from './Search'
import Table from './Table'
import CreateTab from './CreateTab'
import DetailTab from './DetailTab'
import Login from './Login'
import './popup.scss'

export class Popup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      createVisible: false,
      detailVisible: false,
      detailWasOpened: false,
      createWasOpened: false,
      selectedRow: {}
    }
  }

  toggleCreateTab = () => {
    const { createVisible } = this.state
    const { getCurrentTabs } = this.props
    this.setState({
      createVisible: !createVisible,
      createWasOpened: true
    })
    if(!createVisible) {
      getCurrentTabs()
    }
  }

  toggleRowDetailTab = (row) => {
    const { detailVisible } = this.state
    this.setState({
      detailVisible: !detailVisible,
      detailWasOpened: true,
      selectedRow: row
    })
  }

  render() {
    const { nextRow, previousRow, loggedIn } = this.props
    const { detailVisible, createVisible, detailWasOpened, createWasOpened, selectedRow } = this.state

    // document.onkeydown = checkKey;
    // function checkKey(e) {
    //   e = e || window.event;
    //   if (e.keyCode == '38') {
    //     previousRow()
    //   }
    //   else if (e.keyCode == '40') {
    //     nextRow()
    //   }
      
    // }

    return (
      <div className="popup" >
      {
        !loggedIn ? <Login /> 
          : <div>
            <Header />
            <div className="popup__body">
              <CreateTab visible={ createVisible } wasOpened={ createWasOpened } onCloseClick={ this.toggleCreateTab } />
              <DetailTab 
                visible= { detailVisible } 
                wasOpened={ detailWasOpened }
                onCloseClick={ this.toggleRowDetailTab } 
                toView={ selectedRow } 
              />
              <Search onPlusClick={ this.toggleCreateTab } />
              <Table onRowSelect={ this.toggleRowDetailTab } />
            </div>
          </div>
      }
      </div>
    )
  }
}


Popup.propTypes = {
  getCurrentTabs: PropTypes.func,
}