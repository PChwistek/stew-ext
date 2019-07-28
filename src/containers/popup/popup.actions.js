
import { POPUP } from '../actionTypes'
import browser from 'webextension-polyfill'

export function openDashboard() {
  return { type: POPUP.OPEN_DASHBOARD }
}

export function dashboardOpened() {
  return { type: POPUP.OPEN_DASHBOARD_SUCCESS }
}

// this is just a testing thing
export function addCount() {
  return {
    type: 'ADD_COUNT',
  }
}

export function startTimer() {
  const data = {
    type: POPUP.TIMER_START,
    payload: {}
  }

  return data
}

export function stopTimer() {
  return {
    type: POPUP.TIMER_STOP
  }
}

export function goToDashboard() {
  return dispatch => {
    dispatch(openDashboard())
    browser.tabs.create({ url: './dashboard/dashboard.html' }).then(() => {
      dispatch(dashboardOpened())
    })
  }
}
