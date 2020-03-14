import store from './store'
import browser from 'webextension-polyfill'
import openPopup from './openPopup'
import { POPUP_OPENED, POPUP_SET_WINDOWID, TABS_SETCURRENTWINDOW, TABS_SETCURRENTTAB } from '../actionTypes'

let windowId = -1

browser.browserAction.onClicked.addListener(async () => {
  try {
    const theWindow = await browser.windows.getCurrent()

    if(theWindow.id != windowId && theWindow.id > 0 && theWindow.type === 'normal') {
      store.dispatch({
        type: TABS_SETCURRENTWINDOW,
        payload: {
          currentWindow: theWindow,
        }
      })
    }

    const currentTabs = await browser.tabs.query({ windowId: theWindow.id, active: true })
    store.dispatch({
      type: TABS_SETCURRENTTAB,
      payload: {
        currentTab: currentTabs.length > 0 ? currentTabs[0] : {},
      }
    })

    store.dispatch({ type: POPUP_OPENED })

    windowId = await openPopup()
    store.dispatch({ 
      type: POPUP_SET_WINDOWID, 
      payload: {
        windowId
      } 
    })


  } catch(error) {
    console.log(error)
  }
})

browser.windows.onFocusChanged.addListener(async (currentWindowId) => {
  try {
    const theWindow = await browser.windows.get(currentWindowId)
    if(currentWindowId != windowId && currentWindowId > 0 && theWindow.type === 'normal') {
      store.dispatch({
        type: TABS_SETCURRENTWINDOW,
        payload: {
          currentWindow: theWindow,
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
})

browser.tabs.onActivated.addListener(async (objectInfo) => {
  console.log('object info', objectInfo)

  const theTab = await browser.tabs.get(objectInfo.tabId)
  store.dispatch({
    type: TABS_SETCURRENTTAB,
    payload: {
      currentTab: theTab,
    }
  })
})