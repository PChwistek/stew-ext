import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Search from './Search'
import Table from './Table'
import DetailTab from './DetailTab'
import Login from './Login'
import './popup.scss'
import { removeDocumentListeners } from './utils'

const Popup = (props) => {

 function handleToggleCreateTab() {
    const { getCurrentTabs, toggleEditing, toggleSlide, slideOutVisible, setRecipeForm } = props
    if(!slideOutVisible) {
      getCurrentTabs(true)
      setRecipeForm('', [], true)
      toggleEditing(true)
    }
    toggleSlide(!slideOutVisible, true)
  }

  function handleToggleRowDetailTab(index) {
    const { toggleSlide, slideOutVisible, selectRow, toggleEditing } = props
    toggleEditing(false)
    if(!slideOutVisible) {
      selectRow(index)
    }
    toggleSlide(!slideOutVisible, false)
  }

  function handleSearchTerms (terms){
    const { setSearchTerms } = props
    setSearchTerms(terms)
  }

  useEffect(() => {
    if(props.terms === '') {
      props.getFirstResults()
    }
  }, [props.terms])

  useEffect(() => {
    if(!props.loggedIn) {
      removeDocumentListeners()
    }
  }, [props.loggedIn])

  const { loggedIn, terms, slideOutVisible, isEditing } = props
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
                  onCloseClick={ isEditing ? handleToggleCreateTab: handleToggleRowDetailTab } 
                  isEditing={ isEditing }
                />
                <Search onPlusClick={ handleToggleCreateTab } setSearchTerms={ handleSearchTerms } terms={ terms }/>
                <Table onRecipeNameClicked={ handleToggleRowDetailTab } />
              </div>
            </div>
        }
      </div>
    </div>
  ) 
}

Popup.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  getCurrentTabs: PropTypes.func.isRequired,
  setSearchTerms: PropTypes.func.isRequired,
  getFirstResults: PropTypes.func.isRequired,
  syncRecipes: PropTypes.func.isRequired,
  toggleSlide: PropTypes.func.isRequired,
  selectRow: PropTypes.func.isRequired,
  setRecipeForm: PropTypes.func.isRequired,
  setRecipeSession: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
}

export default Popup