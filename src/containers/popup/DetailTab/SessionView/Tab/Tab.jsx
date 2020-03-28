import React from 'react'

import removeRed from 'Assets/remove-red.png'
import chrome from 'Assets/chrome.png'

export default function Tab(props) {
  const { tab, canEdit, index, winIndex, removeTabFromSnap } = props
  return (
    <div className='tab__row' key={ 'row' + index }>
      {
        canEdit && (
          <div key={ 'remove' + index} className='tab__remove-container' onClick={ () => removeTabFromSnap(winIndex, index) }> 
            <img src={ removeRed} className='tab__remove' />
          </div>
        )
      }
        <div className='tab__body'>
          <img src={ tab.favIconUrl || chrome } className='tab__fav' />
            <p className='tab__title'>
              <a href={ tab.url } className={ 'tab__title' } target="blank">
                { tab.title }          
              </a>
            </p>
        </div>
    </div>
  )
}