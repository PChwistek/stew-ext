import React from 'react'

export default function Tab(props) {
  const { tab, canEdit, index, winIndex, removeTabFromSnap } = props
  return (
    <div className='tab__row' key={ 'row' + index }>
      {
        canEdit && (
          <div key={ 'remove' + index} className='tab__remove-container' onClick={ () => removeTabFromSnap(winIndex, tab) }> 
            <img src={ '../../../assets/remove-red.png' } className='tab__remove' />
          </div>
        )
      }
        <div className='tab__body'>
          <img src={ tab.favIconUrl || '../../../assets/chrome.png' } className='tab__fav' />
            <p className='tab__title'>
              <a href={ tab.url } className={ 'tab__title' } target="blank">
                { tab.title }          
              </a>
            </p>
        </div>
    </div>
  )
}