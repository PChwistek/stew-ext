import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Search from './Search'
import Table from './Table'
import DetailTab from './DetailTab'
import Login from './Login'
import './popup.scss'

export default class Popup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      slideOutOpened: false,
    }
  }

  componentDidMount() {
    const { loggedIn, syncRecipes } = this.props
    if(loggedIn) {
      syncRecipes()
    }
  }
    
  handleToggleCreateTab = () => {
    const { getCurrentTabs, toggleSlide, slideOutVisible } = this.props

    if(!slideOutVisible) {
      getCurrentTabs()
      this.setState({ slideOutOpened: false })
    } else {
      this.setState({ slideOutOpened: true })
    }
    toggleSlide(!slideOutVisible, true)
  }

  handleToggleRowDetailTab = (row) => {
    const { toggleSlide, slideOutVisible, selectRow } = this.props
    if(!slideOutVisible) {
      this.setState({ slideOutOpened: false })
      selectRow(row)
    } else {
      this.setState({ slideOutOpened: true })
    }
    toggleSlide(!slideOutVisible, false)
  }

  handleSearchTerms = (terms) => {
    const { setSearchTerms } = this.props
    setSearchTerms(terms)
  }
  
  render() {
    const { loggedIn, getFirstResults, terms, slideOutVisible, isEditing } = this.props
    const { slideOutOpened } = this.state
    console.log('props in popup', this.props)
    if(terms == '') {
      getFirstResults()
    }
    return (
      <div className="popup" >
      {
        !loggedIn ? <Login /> 
          : <div>
            <Header />
            <div className="popup__body">
              <DetailTab 
                visible={ slideOutVisible } 
                wasOpened={ slideOutOpened } 
                onCloseClick={ isEditing ? this.handleToggleCreateTab: this.handleToggleRowDetailTab } 
                editing={ isEditing }
              />
              <Search onPlusClick={ this.handleToggleCreateTab } setSearchTerms={ this.handleSearchTerms } terms={ terms }/>
              <Table onRecipeNameClicked={ this.handleToggleRowDetailTab } />
            </div>
          </div>
      }
      </div>
    ) 
  }
}

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


Popup.propTypes = {
  getCurrentTabs: PropTypes.func,
}