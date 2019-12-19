import browser from 'webextension-polyfill'

export default class Manager {

  async getSession() {
    let windows = await browser.windows.getAll()
    windows = windows.filter(win => win.type === 'normal')
    
    let session = []

    var i = 0
    for (i = 0; i < windows.length; i++) {
      const index = i
      const windowTabs = await browser.tabs.query({ windowId: windows[index].id})
      const win = {
        id: windows[index].id,
        tabs: windowTabs
      }
      session.push(win)
    }    

    return session
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