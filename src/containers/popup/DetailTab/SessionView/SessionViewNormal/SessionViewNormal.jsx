import React from 'react'

export default function(props) {
  
  return (
    <div>
      { props.session && props.session.map((win, winIndex) => (
        <div key={ winIndex }>
          <div className='createtab__window-row'>     
            <div className='createtab__window-title'>Window { winIndex + 1 } </div>
              <img src={ '../../../../../assets/window-sketch.png' } className='createtab__window-icon' />
              {
                props.canEdit && (
                  <div className='createtab__window-remove-container' onClick={ () => props.removeWindowFromSnap(winIndex) }> 
                    <img src={ '../../../../../assets/remove-red.png' } className='createtab__window-remove' />
                  </div>    
                )
              }
            </div>
          {
            (win && win.tabs.length > 0) && win.tabs.map( (tab, tabIndex) => (
              <div className='tab__row' key={ winIndex + 'tabIndex' + tabIndex }>
                {
                  props.canEdit && (
                    <div key={ 'remove' + tabIndex} className='tab__remove-container' onClick={ () => props.removeTabFromSnap(winIndex, tabIndex) }> 
                      <img src={ '../../../../../assets/remove-red.png' } className='tab__remove' />
                    </div>
                  )
                }
                <div className='tab__body'>
                  <img src={ tab.favIconUrl || '../../../../../assets/chrome.png' } className='tab__fav' />
                    <p className='tab__title'>
                      { tab.title }          
                    </p>
                </div>
              </div>
            ))
          }
          </div>
      ))}
    </div>
  )
}