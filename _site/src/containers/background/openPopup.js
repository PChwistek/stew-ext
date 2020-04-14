import browser from 'webextension-polyfill'

let windowId = -1

export default async function openPopup() {

  async function popWindow(url, customOptions) {

    if (windowId < 0) {
      const win = await browser.windows.create({ url, ...customOptions })
      windowId = win.id
      if (navigator.userAgent.indexOf('Firefox') !== -1) {
        browser.windows.update(win.id, { focused: true, ...customOptions })
      }
      return { isNewWindow: true, windowId }
    }
    customOptions.focused = true
    browser.windows.update(windowId, { focused: true })
      .catch(error => {
        windowId = -1
        popWindow(url, customOptions)
      })
    return { isNewWindow: false, windowId }
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

  return await popWindow(url, params)
}
