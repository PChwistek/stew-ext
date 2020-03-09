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
                  <img src={ '' } className='createtab__window-remove' />
                </div>    
              )
            }
        </div>
        {
          win && win.tabs.map(tab => (
            <div className='tab__row' key={ 'row' +tab.index }>
              {
                canEdit && (
                  <div key={ 'remove' + tab.index} className='tab__remove-container' onClick={ () => removeTabFromSnap(win, tab) }> 
                    <img src={ '' } className='tab__remove' />
                  </div>
                )
              }
              <a href={ tab.url } target="blank">
                <div className='tab__body'>
                  <img src={ tab.favIconUrl || '../../../assets/chrome.png' } className='tab__fav' />
                  <p className='tab__title'> { tab.title } </p>
                </div>
              </a>
          </div>
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