import browser from 'webextension-polyfill'

let windowId = -1

export default function openPopup() {

  function popWindow(url, customOptions) {

    if (windowId < 0) {
      browser.windows.create({ url, ...customOptions }).then((win) => {
        windowId = win.id
        if (navigator.userAgent.indexOf('Firefox') !== -1) {
          browser.windows.update(win.id, { focused: true, ...customOptions })
        }
      })
    } else {
      customOptions.focused = true
      browser.windows.update(windowId, { focused: true })
        .catch(error => {
          windowId = -1
          popWindow(url, customOptions)
        })
    }
  }

  const width = 610
  const height = 630 

  let params = { 
    left: parseInt( (window.screen.availWidth - width) / 2), 
    top: parseInt((window.screen.availHeight - height) / 3), 
    width, 
    height,
    type: 'popup'
  }

  let url = 'popup/popup.html'

  popWindow(url, params)
}
