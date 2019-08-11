import browser from 'webextension-polyfill'

// need to fix a bug where everything closes and doesn't fully update on tab updating... and listeners...
export default class Blocker {
  constructor(blacklist) {
    this.blacklist = blacklist
    this.currentlyBlocking = {}
  }

  checkIfInBlacklist(url) {
    const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g // verifies domain is actually a link
    const filteredURL = url.match(regex)[0]
    if(this.blacklist[filteredURL]) {
      return true
    }
    return false
  }

  checkAllTabs() {
    browser.tabs.query({windowId: null}).then(tabs => {
      tabs.forEach(tab => {
        if(this.checkIfInBlacklist(tab.url)) {
          browser.tabs.executeScript(tab.id, {
            file: 'content/block.js'
          }).then(res => console.log(res)).catch(err => console.log('err', err))
        }
      })
    })
  }

  setListeners() {
    browser.tabs.onUpdated.addListener(tabId => {
      browser.tabs.get(tabId).then(tab => {
        if(!this.checkIfInBlacklist(tab.url)) {
          this.currentlyBlocking[tabId] = false
        } else {
          this.currentlyBlocking[tabId] = false
        }
      })
    })
  
    browser.webNavigation.onDOMContentLoaded.addListener(siteToVisit => {
      if(this.checkIfInBlacklist(siteToVisit.url)) {
        if(!this.currentlyBlocking[siteToVisit.tabId]) {
          this.currentlyBlocking[siteToVisit.tabId] = true
          browser.tabs.executeScript(siteToVisit.tabId, {
            file: 'content/block.js'
          }).then(res => console.log(res)).catch(err => console.log('err', err))
        }
      }
    })
  }
}