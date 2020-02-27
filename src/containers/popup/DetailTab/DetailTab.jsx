import React from 'react'
import SlideIn from '../SlideIn'
import ViewRecipe from './ViewRecipe'
import EditRecipe from './EditRecipe'
import SessionView from '../SessionView'

export default function DetailTab(props) {
 
  function handleToggleEdit() {
    const { toggleEditing, setRecipeSession, selectedRecipe } = props
    toggleEditing()
    console.log('selectedRecipe', selectedRecipe)
    setRecipeSession(selectedRecipe.config)
  }
  
  const { 
    isEditing, 
    removeTabFromSnap, 
    removeWindowFromSnap, 
    getCurrentTabs, 
    selectedRecipe,
    launchRecipe, 
    session
  } = props

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
            /> 
            : <ViewRecipe 
                selectedRecipe={ selectedRecipe } 
                launchRecipe={ launchRecipe } 
                handleEditingClicked={ handleToggleEdit }
              />
          }
          <SessionView 
            session={ session } 
            removeTabFromSnap={ removeTabFromSnap } 
            removeWindowFromSnap={ removeWindowFromSnap } 
            getCurrentTabs={ getCurrentTabs }
            canEdit={ isEditing }
          />
        </div>
    </SlideIn>
  )

}
