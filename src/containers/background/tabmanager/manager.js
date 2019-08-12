import browser from 'webextension-polyfill'

export default class Manager {
  constructor(tabLimit, startupTabs) {
    this.tabLimit = tabLimit
    this.startupTabs = startupTabs

    this.limitListener = function(tab) {
      browser.tabs.query({windowId: null}).then(tabs => {
        if(tabs.length > this.tabLimit) {
          browser.tabs.remove(tab.id)
        }
      })
    }

    this.limitHandler = this.limitListener.bind(this)
  }

  nukeAndReplace() {
    this.removeListeners()
    browser.tabs.query({windowId: null}).then(tabs => {
      browser.tabs.remove(tabs.map(tab => tab.id)).then(() => {
        this.startupTabs.forEach(tab => {
          browser.tabs.create({ url: tab})
        })
      })
    })

  }

  setTabLimits() {
    browser.tabs.onCreated.addListener(this.limitHandler)
  }

  removeListeners() {
    browser.tabs.onCreated.removeListener(this.limitHandler)
  }
}