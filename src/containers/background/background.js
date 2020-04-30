import store from './store'
import browser from 'webextension-polyfill'
import openPopup from './openPopup'
import { POPUP_OPENED, POPUP_SET_WINDOWID, TABS_SETCURRENTWINDOW, TABS_SETCURRENTTAB, TABS_SNAP } from 'Containers/actionTypes'

let popupWindowId = -1
let currentTabId = -1

function handleWindowClosed(windowId) {
  if(windowId === popupWindowId) {
    removeInAppListeners()
    removeEditListeners()
    browser.windows.onRemoved.removeListener(handleWindowClosed)
  }
}

function updateSnapshot() {
  store.dispatch({ type: TABS_SNAP })
}

function updateSnapshotorCurrentTab(tabId) {
  updateSnapshot()
  updateTab(tabId)
}

async function updateTab(tabId) {
    const theTab = await browser.tabs.get(tabId)
    if(theTab.windowId !== popupWindowId) {
      currentTabId = tabId
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
    if(popupWindowId != theWindow.id && currentWindowId > 0 && theWindow.type === 'normal') {
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

function onTabFocusChanged( { tabId, windowId }) {
  if(windowId !== popupWindowId) {
    currentTabId = tabId
    updateWindow(windowId)
    updateTab(tabId)
  }
}


export function addInAppListeners() {
  browser.tabs.onActivated.addListener(onTabFocusChanged)
  browser.tabs.onUpdated.addListener(updateSnapshotorCurrentTab)
}

export function removeInAppListeners() {
  browser.tabs.onActivated.removeListener(onTabFocusChanged)
  browser.tabs.onUpdated.removeListener(updateSnapshotorCurrentTab)
}

export function addEditListeners() {
  browser.windows.onRemoved.addListener(updateSnapshot)
  browser.tabs.onRemoved.addListener(updateSnapshot)
  browser.tabs.onMoved.addListener(updateSnapshot)
  browser.tabs.onDetached.addListener(updateSnapshot)
  browser.tabs.onAttached.addListener(updateSnapshot)
}

export function removeEditListeners() {
  browser.windows.onRemoved.removeListener(updateSnapshot)
  browser.tabs.onRemoved.removeListener(updateSnapshot)
  browser.tabs.onMoved.removeListener(updateSnapshot)
  browser.tabs.onDetached.removeListener(updateSnapshot)
  browser.tabs.onAttached.removeListener(updateSnapshot)
}

browser.browserAction.onClicked.addListener(async () => {
  try {
    const theWindow = await browser.windows.getCurrent()

    if(theWindow.id != popupWindowId && theWindow.id > 0 && theWindow.type === 'normal') {
      store.dispatch({
        type: TABS_SETCURRENTWINDOW,
        payload: {
          currentWindow: theWindow,
        }
      })
    }

    store.dispatch({ type: POPUP_OPENED })
    const { isNewWindow, windowId } = await openPopup()
    if(isNewWindow) {
      popupWindowId = windowId
      const currentTabs = await browser.tabs.query({ windowId: theWindow.id, active: true })
      const newTabId = currentTabs.length > 0 ? currentTabs[0].id : -1
      if(popupWindowId !== currentTabs.windowId) {
        currentTabId = newTabId
        store.dispatch({
          type: TABS_SETCURRENTTAB,
          payload: {
            currentTab: currentTabs.length > 0 ? currentTabs[0] : {},
          }
        })
      }
      addInAppListeners()
      browser.windows.onRemoved.addListener(handleWindowClosed)
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