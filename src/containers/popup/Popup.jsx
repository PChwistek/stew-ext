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
  }

  componentDidMount() {
    const { popupOpened } = this.props
    popupOpened()
  }
    
  handleToggleCreateTab = () => {
    const { getCurrentTabs, toggleSlide, slideOutVisible, setRecipeForm } = this.props

    if(!slideOutVisible) {
      getCurrentTabs()
      setRecipeForm('', [], true)
    } else {
    }
    toggleSlide(!slideOutVisible, true)
  }

  handleToggleRowDetailTab = (row) => {
    const { toggleSlide, slideOutVisible, selectRow, setRecipeSession, setRecipeForm } = this.props
    if(!slideOutVisible) {
      this.setState({ slideOutOpened: false })
      selectRow(row)
      setRecipeSession(row.config)
      setRecipeForm(row.name, row.tags, false)
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
                onCloseClick={ isEditing ? this.handleToggleCreateTab: this.handleToggleRowDetailTab } 
                isEditing={ isEditing }
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