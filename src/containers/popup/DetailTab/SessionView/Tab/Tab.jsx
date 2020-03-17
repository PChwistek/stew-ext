import React from 'react'

export default function Tab(props) {
  const { tab, canEdit, index, win } = props
  return (
    <div className='tab__row' key={ 'row' + index }>
      {
        canEdit && (
          <div key={ 'remove' + index} className='tab__remove-container' onClick={ () => removeTabFromSnap(win, tab) }> 
            <img src={ '../../../assets/remove-red.png' } className='tab__remove' />
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
  )
}