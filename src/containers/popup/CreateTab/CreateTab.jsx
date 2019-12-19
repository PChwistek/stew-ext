import React from 'react'
import SlideIn from '../SlideIn'

export default function CreateTab(props) {

  const { tabs } = props
  const session = tabs.session

  function windowTabs(win, index) {
    
    return (
      <div>
        <div className='createtab__window-row'>
          <div className='createtab__window-title'>Window { index + 1 } </div>
          <img src={ '../../../assets/window-sketch.png' } className='createtab__window-icon' />
        </div>
        {
          win && win.tabs.map(tab => (
            <div className='tab__row'>
              <div className='tab__remove-container'> 
                <img src={ '' } className='tab__remove' />
              </div>
              <div className='tab__body'>
                <img src={ tab.favIconUrl || '../../../assets/chrome.png' } className='tab__fav' />
                <p className='tab__title'> { tab.title } </p>
              </div>
          </div>
        ))
      }
      </div>
    )
  }

  
  return (
    <SlideIn { ...props } >
      <div className={ 'createtab' }>
        <div className={ 'createtab__form'}>
          Open Tabs
        </div>
        <div className='createtab__session'>
          <div className='createtab__title'>
            Session Snapshot
          </div>
          <div className='tab__col'>
            {
              session && session.map((win, index) => {
                return windowTabs(win, index)
              })
            }
          </div>
        </div>
      </div>
    </SlideIn>
  )
}