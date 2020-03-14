import store from './store'
import browser from 'webextension-polyfill'
import openPopup from './openPopup'
import { POPUP_OPENED } from '../actionTypes'

browser.browserAction.onClicked.addListener(() => {
  store.dispatch({ type: POPUP_OPENED })
  openPopup()
})