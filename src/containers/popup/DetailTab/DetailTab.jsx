import React, { useEffect, useState } from 'react'
import SlideIn from '../SlideIn'
import ViewRecipe from './ViewRecipe'
import EditRecipe from './EditRecipe'
import SessionView from './SessionView'
import TabHelper from './TabHelper'

export default function DetailTab(props) {

  const [showHelper, setShowHelper] = useState(false)

  function checkTabPopup() {
    const { tabs , session, isEditing } = props
    if(tabs.isNew || isEditing ) {
      setShowHelper(false) 
      return
    }
    const { currentTab } = tabs
    for (let index = 0; index < session.length; index++) {
      for (let tabIndex = 0; tabIndex < session[index].tabs.length; tabIndex++) {
        const tab = session[index].tabs[tabIndex]
        console.log(tab)
        console.log('current', currentTab)
        if(tab.url === currentTab.url) {
          setShowHelper(false)
          return
        }
      }
    }
    setShowHelper(true)
  }

  useEffect(() => {
    if(props.visible) {
      const timer = setTimeout(() => {
        checkTabPopup()
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowHelper(false)
    }
  }, [props.visible, props.currentTab])
 
  function handleToggleEdit() {
    const { toggleEditing, selectedRecipe, setRecipeForm, isEditing } = props
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
    setShowHelper(false)
  }

  function handleGetCurrentTabs() {
    const { getCurrentTabs, setRecipeSession, selectedRecipe, tabs } = props

    if(tabs.isNew) {
      getCurrentTabs()
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
    favorites
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
            in={ showHelper } 
            currentTab={ props.currentTab } 
            onNoClick={ () => setShowHelper(false) }
            onYesClick={ handleQuickAdd }
          />
        </div>
    </SlideIn>
  )

}
