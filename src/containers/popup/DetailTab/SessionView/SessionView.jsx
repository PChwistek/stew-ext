import React from 'react'
import PropTypes from 'prop-types'

export default function SessionView(props) {

  const { removeWindowFromSnap, removeTabFromSnap, canEdit, session, getCurrentTabs } = props

  function windowTabs(win, index) {
    return (
      <div key={ index }>
        <div className='createtab__window-row'>     
          <div className='createtab__window-title'>Window { index + 1 } </div>
            <img src={ '../../../assets/window-sketch.png' } className='createtab__window-icon' />
            {
              canEdit && (
                <div className='createtab__window-remove-container' onClick={ () => removeWindowFromSnap(win) }> 
                  <img src={ '../../../assets/remove-red.png' } className='createtab__window-remove' />
                </div>    
              )
            }
        </div>
        {
          (win && win.tabs.length > 0) && win.tabs.map( (tab,index) => ( 
            <Tab 
              canEdit={ canEdit} 
              tab={ tab } 
              win={ win } 
              index={ index }
            />
          ))
      }
      </div>
    )
  }

  return (
    <div className='createtab__session'>
      <div className='createtab__title-row'>
        <div className='createtab__title'>
          Session Snapshot
        </div>
        {
          canEdit && (
            <div onClick={ getCurrentTabs }>
              <img src={ '../../../assets/reload.png' } className={ 'createtab__refresh' }/>
            </div>
          )
        }
      </div>
      <div className='tab__col'>
        {
          session && session.map((win, index) => {
            return windowTabs(win, index)
          })
        }
      </div>
    </div>
  )
}