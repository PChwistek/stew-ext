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
      browser.tabs.update(tabs[0].id, { url: this.startupTabs[0] })
      tabs.shift()
      browser.tabs.remove(tabs.map(tab => tab.id)).then(() => {})
    })

    for (let index = 1; index < this.startupTabs.length; index++) {
      const newUrl = this.startupTabs[index]
      browser.tabs.create({ url: newUrl })
    }


  }

  setTabLimits() {
    browser.tabs.onCreated.addListener(this.limitHandler)
  }

  removeListeners() {
    browser.tabs.onCreated.removeListener(this.limitHandler)
  }
}