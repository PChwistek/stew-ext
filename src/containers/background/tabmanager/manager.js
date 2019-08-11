import browser from 'webextension-polyfill'

//need to fix listener removal
export default class Manager {
  constructor(tabLimit, startupTabs) {
    this.tabLimit = tabLimit
    this.startupTabs = startupTabs
  }

  nukeAndReplace() {
    this.removeListeners()
    browser.tabs.query({windowId: null}).then(tabs => {
      this.startupTabs.forEach(tab => {
        browser.tabs.create({ url: tab})
      })
      browser.tabs.remove(tabs.map(tab => tab.id)).then(() => {})
    })
  }

  limitListener(tab) {
    browser.tabs.query({windowId: null}).then(tabs => {
      if(tabs.length > this.tabLimit) {
        browser.tabs.remove(tab.id)
      }
    })
  }

  setTabLimits() {
    browser.tabs.onCreated.addListener(this.limitListener.bind(this))
  }

  removeListeners() {
    browser.tabs.onCreated.removeListener(this.limitListener)
  }
}