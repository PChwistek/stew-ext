
import { POPUP, TIMER } from '../actionTypes'
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

export function startTimer(milliseconds) {
  return {
    type: TIMER.START,
    payload: {
      milliseconds,
    }
  }
}

export function stopTimer() {
  return {
    type: TIMER.STOP
  }
}

export function pauseTimer() {
  return {
    type: TIMER.PAUSE
  }
}

export function resumeTimer() {
  return {
    type: TIMER.RESUME
  }
}

export function endEarly() {
  return {
    type: TIMER.END_EARLY
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
