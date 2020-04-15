import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SlideIn from '../SlideIn'
import ViewRecipe from './ViewRecipe'
import EditRecipe from './EditRecipe'
import SessionView from './SessionView'
import TabHelper from './TabHelper'
import { compareObjects } from 'Containers/utils'

import chrome from 'Assets/chrome.png'

export default function DetailTab(props) {

  const [showTabHelper, setShowTabHelper] = useState(false)
  const [showMergeHelper, setShowMergeHelper] = useState(false)

  function checkTabPopup() {
    const { tabs , session, isEditing, currentTab } = props
    if(tabs.isNew || isEditing || !currentTab || Object.keys(currentTab).length === 0) {
      setShowTabHelper(false) 
      return
    }
    for (let index = 0; index < session.length; index++) {
      for (let tabIndex = 0; tabIndex < session[index].tabs.length; tabIndex++) {
        const tab = session[index].tabs[tabIndex]
        if(tab.url === currentTab.url) {
          setShowTabHelper(false)
          return
        }
      }
    }
    setShowTabHelper(true)
  }


  useEffect(() => {
    const noDiff = compareObjects(props.tabs.initialLiveSession, props.liveSession)
    if(!isEditing || noDiff || props.tabs.wasMerged) {
      setShowMergeHelper(false)
      return
    }
    if(props.visible) {
      const timer = setTimeout(() => {
        setShowMergeHelper(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowMergeHelper(false)
    }
  }, [props.isEditing, props.session, props.liveSession])

  useEffect(() => {
    if(props.visible) {
      const timer = setTimeout(() => {
        checkTabPopup()
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowTabHelper(false)
    }
  }, [props.visible, props.currentTab, props.isEditing])
 
  function handleToggleEdit() {
    const { toggleEditing, selectedRecipe, setRecipeForm, isEditing, getCurrentTabs } = props
    getCurrentTabs()
    toggleEditing(!isEditing)
    setRecipeForm(selectedRecipe.name, selectedRecipe.tags, false)
  }

  function handleSaveRecipe() {
    const { saveRecipe, toggleEditing } = props
    saveRecipe()
    toggleEditing(false)
  }

  function handleQuickAdd() {
    const { quickAdd } = props
    quickAdd()
    setShowTabHelper(false)
  }

  function handleMergeSession() {
    const { mergeSession } = props
    mergeSession()
    setShowMergeHelper(false)
  }

  function handleGetCurrentTabs() {
    const { getCurrentTabs, setRecipeSession, selectedRecipe, tabs, liveSession } = props
    if(tabs.isNew) {
      getCurrentTabs()
      setRecipeSession(liveSession)
    } else {
      setRecipeSession(selectedRecipe.config)
    }
  }

  const { 
    isEditing, 
    removeTabFromSnap, 
    removeWindowFromSnap, 
    selectedRecipe,
    launchRecipe, 
    session,
    deleteRecipe,
    setFavorite,
    favorites,
    moveTab
  } = props

  const isFavorite = favorites.findIndex(recipe => recipe === selectedRecipe._id) > -1
  return(
    <SlideIn 
      wasOpened={ props.wasOpened }
      onCloseClick={ props.onCloseClick }
      visible={ props.visible } 
    >
        <div className={ 'detailtab' }>
          {
            isEditing 
            ? <EditRecipe 
              { ...props }
              handleSaveRecipe={ handleSaveRecipe }
            /> 
            : <ViewRecipe 
                selectedRecipe={ selectedRecipe } 
                launchRecipe={ launchRecipe } 
                handleEditingClicked={ handleToggleEdit }
                setFavorite={ setFavorite }
                deleteRecipe={ deleteRecipe }
                isFavorite={ isFavorite }
              />
          }
          <SessionView 
            session={ session } 
            removeTabFromSnap={ removeTabFromSnap } 
            removeWindowFromSnap={ removeWindowFromSnap } 
            getCurrentTabs={ handleGetCurrentTabs }
            canEdit={ isEditing }
            moveTab={ moveTab }
          />
          <TabHelper 
            in={ showTabHelper } 
            onNoClick={ () => setShowTabHelper(false) }
            onYesClick={ handleQuickAdd }
            title={ 'Quick Add' }
            tooltipText={ 'Allows you to add the currently active tab.' }
          >
            <div className={ 'tabhelper__tab-container'}>
              <a href={ props.currentTab.url } target="blank">
                <div className='tab__body'>
                  <img src={ props.currentTab.favIconUrl || chrome } className='tab__fav' />
                  <p className='tab__title'> { props.currentTab.title } </p>
                </div>
              </a>
            </div>
          </TabHelper>
          <TabHelper 
            in={ showMergeHelper } 
            onNoClick={ () => { 
              setShowMergeHelper(false) } 
            }
            onYesClick={ handleMergeSession }
            title={ 'Merge current session?' }
            tooltipText={ props.tabs.isNew 
              ? 'Your session has changed since this snapshot. Would you like to merge the current session?' 
              : 'This recipe is different than your current session. Would you like to merge?' 
            }
          />
        </div>
    </SlideIn>
  )
}

DetailTab.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  launchRecipe: PropTypes.func.isRequired,
  removeTabFromSnap: PropTypes.func.isRequired,
  getCurrentTabs: PropTypes.func.isRequired,
  removeWindowFromSnap: PropTypes.func.isRequired,
  setRecipeName: PropTypes.func.isRequired,
  setRecipeTag: PropTypes.func.isRequired,
  addRecipeTag: PropTypes.func.isRequired,
  removeRecipeTag: PropTypes.func.isRequired,
  clearFields: PropTypes.func.isRequired,
  saveRecipe: PropTypes.func.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  setRecipeForm: PropTypes.func.isRequired,
  setRecipeSession: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
  quickAdd: PropTypes.func.isRequired,
  mergeSession: PropTypes.func.isRequired,
  moveTab: PropTypes.func.isRequired
}
