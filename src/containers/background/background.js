import store from './store'
import browser from 'webextension-polyfill'
import openPopup from './openPopup'
import { POPUP_OPENED, POPUP_SET_WINDOWID, TABS_SETCURRENTWINDOW, TABS_SETCURRENTTAB, TABS_SNAP } from '../actionTypes'

let windowId = -1
let currentTabId = -1

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

    store.dispatch({ type: POPUP_OPENED })
    const { isNewWindow, windowId } = await openPopup()
    console.log('is new window', isNewWindow)
    if(isNewWindow) {
      const currentTabs = await browser.tabs.query({ windowId: theWindow.id, active: true })
      const newTabId = currentTabs.length > 0 ? currentTabs[0].id : -1
      if(currentTabId !== newTabId) {
        currentTabId = newTabId
        store.dispatch({
          type: TABS_SETCURRENTTAB,
          payload: {
            currentTab: currentTabs.length > 0 ? currentTabs[0] : {},
          }
        })
      }
    }

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
  if(theTab.id !== currentTabId) {

    currentTabId = theTab.id
    store.dispatch({
      type: TABS_SETCURRENTTAB,
      payload: {
        currentTab: theTab,
      }
    })
  }
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
    }
  } catch (error) {
    console.log(error)
  }
}

browser.tabs.onActivated.addListener(updateTab)

export function addEditListeners() {
  browser.windows.onFocusChanged.addListener(updateWindow)
  browser.windows.onRemoved.addListener(updateSnapshot)
  browser.tabs.onUpdated.addListener(updateSnapshot)
  browser.tabs.onRemoved.addListener(updateSnapshot)
  browser.tabs.onMoved.addListener(updateSnapshot)
  browser.tabs.onDetached.addListener(updateSnapshot)
  browser.tabs.onAttached.addListener(updateSnapshot)
}

export function removeEditListeners() {
  browser.windows.onFocusChanged.removeListener(updateWindow)
  browser.windows.onRemoved.removeListener(updateSnapshot)
  browser.tabs.onUpdated.removeListener(updateSnapshot)
  browser.tabs.onRemoved.removeListener(updateSnapshot)
  browser.tabs.onMoved.removeListener(updateSnapshot)
  browser.tabs.onDetached.removeListener(updateSnapshot)
  browser.tabs.onAttached.removeListener(updateSnapshot)
}