import React, { useEffect, useState } from 'react'
import SlideIn from '../SlideIn'
import ViewRecipe from './ViewRecipe'
import EditRecipe from './EditRecipe'
import SessionView from './SessionView'
import TabHelper from './TabHelper'
import { compareObjects } from '../../utils'

export default function DetailTab(props) {

  const [showTabHelper, setShowTabHelper] = useState(false)
  const [showMergeHelper, setShowMergeHelper] = useState(false)

  function checkTabPopup() {
    const { tabs , session, isEditing } = props
    if(tabs.isNew || isEditing ) {
      setShowTabHelper(false) 
      return
    }
    const { currentTab } = tabs
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

  function checkMergePopup() {
    const { session, liveSession } = props
    const noDiff = compareObjects(props.tabs.initialLiveSession, liveSession)
    if(noDiff) {
      setShowMergeHelper(false)
    } else {
      setShowMergeHelper(true)
    }
  }

  useEffect(() => {
    if(!isEditing || props.tabs.wasMerged || props.tabs.mergePopupClosed) {
      setShowMergeHelper(false)
      return
    }
    if(props.visible) {
      const timer = setTimeout(() => {
        checkMergePopup()
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowMergeHelper(false)
    }
  }, [props.isEditing, props.session, props.windowSession])

  useEffect(() => {
    if(isEditing) {
      setShowTabHelper(false)
      return
    }
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
    mergePopupClosed
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
          />
          <TabHelper 
            in={ showTabHelper } 
            onNoClick={ () => setShowTabHelper(false) }
            onYesClick={ handleQuickAdd }
            title={ 'Quick Add' }
            tooltipText={ 'Allows you to add the currently active tab.' }
          >
            <div>
              <a href={ props.currentTab.url } target="blank">
                <div className='tab__body'>
                  <img src={ props.currentTab.favIconUrl || '../../../assets/chrome.png' } className='tab__fav' />
                  <p className='tab__title'> { props.currentTab.title } </p>
                </div>
              </a>
            </div>
          </TabHelper>
          <TabHelper 
            in={ showMergeHelper } 
            onNoClick={ () => { 
              setShowMergeHelper(false), 
              mergePopupClosed() } 
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
