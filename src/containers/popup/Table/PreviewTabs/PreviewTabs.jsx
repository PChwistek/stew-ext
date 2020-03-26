import React from 'react'
import { CSSTransition } from "react-transition-group"
import PropTypes from 'prop-types'

export default function PreviewTabs(props) {
  const { config } = props
  const selectedTabs = []
  let numTabs = 0

  function getTabs() {
    let windowIndex = 0
    while (windowIndex < config.length) {
      const theWindow = config[windowIndex]
      for (let tabIndex = 0; tabIndex < theWindow.tabs.length; tabIndex++) {
        const element = theWindow.tabs[tabIndex]

        if(selectedTabs.length < 3) {
          selectedTabs.push(element)
        } 
      }
      numTabs += theWindow.tabs.length
      windowIndex += 1
    }
  }

  getTabs()
  return (
    <div>
      <div className={ 'preview-tabs-container' } >
        <div className='preview-text'> Preview ({ selectedTabs.length } of { numTabs }) </div>
        <div className={ 'preview-tabs' }>
        {
          selectedTabs.map( (tab, index) => (
            <a href={ tab.url } target="blank" key={ 'preview' + tab.url + index } >
              <div className='tab__body tab__body--preview'>
                  <img src={ tab.favIconUrl || '../../../assets/chrome.png' } className='tab__fav' />
                  <p className='tab__title'> { tab.title } </p>
              </div>
            </a>
          ))
        }
        </div>
      </div>
    </div>
  )
}

PreviewTabs.propTypes = {
  // config: Array,
}