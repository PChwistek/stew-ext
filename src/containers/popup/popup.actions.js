
import { POPUP } from '../actionTypes'
import browser from 'webextension-polyfill'

export function openDashboard() {
  return { type: POPUP.OPEN_DASHBOARD }
}

export function dashboardOpened() {
  return { type: POPUP.OPEN_DASHBOARD_SUCCESS }
}

export function goToDashboard() {
  return dispatch => {
    dispatch(openDashboard())
    return browser.tabs.create({ url: './dashboard/dashboard.html' }).then(dispatch => {
      dispatch(dashboardOpened())
    })
  }
}

// this is just a testing thing
export function addCount() {
  return {
    type: 'ADD_COUNT',
  }
}