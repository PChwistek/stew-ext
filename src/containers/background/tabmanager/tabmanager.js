import browser from 'webextension-polyfill'

export default class Manager {

  async getCurrentTabs() {
    const tabs = await browser.tabs.query({windowId: null})
    return tabs
  }

  nukeAndReplace(desiredTabs) {
    this.removeListeners()
    browser.tabs.query({windowId: null}).then(tabs => {
      browser.tabs.update(tabs[0].id, { url: this.desiredTabs[0] })
      tabs.shift()
      browser.tabs.remove(tabs.map(tab => tab.id)).then(() => {})
    })
  
    for (let index = 1; index < this.desiredTabs.length; index++) {
      const newUrl = this.desiredTabs[index]
      browser.tabs.create({ url: newUrl })
    }
  }

}