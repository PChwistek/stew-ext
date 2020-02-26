import React from 'react'
import SlideIn from '../SlideIn'
import ViewRecipe from './ViewRecipe'
import EditRecipe from './EditRecipe'
import SessionView from '../SessionView'

export default function DetailTab(props) {
  const { 
    editing, 
    session, 
    removeTabFromSnap, 
    removeWindowFromSnap, 
    getCurrentTabs, 
    selectedRecipe,
    launchRecipe } = props
  return(
    <SlideIn 
      wasOpened={ props.wasOpened }
      onCloseClick={ props.onCloseClick }
      visible={ props.visible } 
    >
        <div className={ 'detailtab' }>
          {
            editing 
            ? <EditRecipe 
              { ...props }
            /> 
            : <ViewRecipe selectedRecipe={ selectedRecipe } launchRecipe={ launchRecipe } />
          }
          <SessionView 
            session={ editing ? session : (selectedRecipe && selectedRecipe.config || [])} 
            removeTabFromSnap={ removeTabFromSnap } 
            removeWindowFromSnap={ removeWindowFromSnap } 
            getCurrentTabs={ getCurrentTabs }
            canEdit={ editing }
          />
        </div>
    </SlideIn>
  )

}
