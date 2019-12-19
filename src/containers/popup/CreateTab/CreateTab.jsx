import React from 'react'
import SlideIn from '../SlideIn'

export default function CreateTab(props) {

  const { tabs } = props
  const currentTabs = tabs.currentTabs
  return (
    <SlideIn { ...props } >
      <div className={ 'createtab' }>
        <div className={ 'createtab__form'}>
          Open Tabs
        </div>
        <div className='createtab__session'>
          <div className='createtab__title'>
            Snapshot
          </div>
          <div className='createtab__window-row'>
            <div className='createtab__window-title'>Window 1 </div>
            <img src={ '../../../assets/window-sketch.png' } className='createtab__window-icon' />
          </div>
          <div className='tab__col'>
            {
              currentTabs && currentTabs.map(tab => {
                return (
                  <div className='tab__row'>
                    <div className='tab__remove-container'> 
                      <div className='tab__remove' />
                    </div>
                    <div className='tab__body'>
                      <img src={ tab.favIconUrl || '../../../assets/chrome.png' } className='tab__fav' />
                      <p className='tab__title'> { tab.title } </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </SlideIn>
  )
}