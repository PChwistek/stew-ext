import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Search from './Search'
import Table from './Table'
import DetailTab from './DetailTab'
import Login from './Login'
import './popup.scss'
import { toggleEditing } from './popup.actions'

export default class Popup extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { popupOpened } = this.props
    popupOpened()
  }
    
  handleToggleCreateTab = () => {
    const { getCurrentTabs, toggleEditing, toggleSlide, slideOutVisible, setRecipeForm } = this.props
    if(!slideOutVisible) {
      setRecipeForm('', [], true)
      getCurrentTabs()
      toggleEditing(true)
    }
    toggleSlide(!slideOutVisible, true)
  }

  handleToggleRowDetailTab = (index) => {
    const { toggleSlide, slideOutVisible, selectRow, setRecipeForm } = this.props
    toggleEditing(false)
    if(!slideOutVisible) {
      setRecipeForm('', [], false)
      selectRow(index)
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
      <div className='popup-container'>
        <div className="small-screen-warning">
          Please re-size the window! it's too small for stew.
        </div>
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
      </div>
    ) 
  }
}

Popup.propTypes = {
  getCurrentTabs: PropTypes.func,
}