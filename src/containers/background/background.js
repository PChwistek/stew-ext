import store from './store'
import browser from 'webextension-polyfill'
import openPopup from './openPopup'
import { POPUP_OPENED, POPUP_SET_WINDOWID, TABS_SETCURRENTWINDOW, TABS_SETCURRENTTAB, TABS_SNAP } from '../actionTypes'

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



function updateSnapshot() {
  store.dispatch({ type: TABS_SNAP })
}

async function updateTab(objectInfo) {

  const theTab = await browser.tabs.get(objectInfo.tabId)
  store.dispatch({
    type: TABS_SETCURRENTTAB,
    payload: {
      currentTab: theTab,
    }
  })
}
async function updateWindow(currentWindowId) {
  try {
    const theWindow = await browser.windows.get(currentWindowId)
    if(currentWindowId != windowId && currentWindowId > 0 && theWindow.type === 'normal') {
      store.dispatch({
        type: TABS_SETCURRENTWINDOW,
        payload: {
          currentWindow: theWindow,
        }
      })

      store.dispatch({ type: TABS_SNAP })
    }
  } catch (error) {
    console.log(error)
  }
}

browser.tabs.onActivated.addListener(updateTab)
browser.windows.onFocusChanged.addListener(updateWindow)

export function addEditListeners() {
  browser.tabs.onUpdated.addListener(updateSnapshot)
  browser.tabs.onRemoved.addListener(updateSnapshot)
  browser.tabs.onMoved.addListener(updateSnapshot)
  browser.tabs.onDetached.addListener(updateSnapshot)
  browser.tabs.onAttached.addListener(updateSnapshot)
}

export function removeEditListeners() {
  browser.windows.onFocusChanged.removeListener(updateWindow)
  browser.tabs.onUpdated.removeListener(updateSnapshot)
  browser.tabs.onRemoved.removeListener(updateSnapshot)
  browser.tabs.onMoved.removeListener(updateSnapshot)
}