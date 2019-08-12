import browser from 'webextension-polyfill'

export default class Blocker {
  constructor(blacklist) {
    this.blacklist = blacklist
    this.currentlyBlocking = {} //helper for more accurate statistics regarding blocked site visits
    
    this.blockingListener = function(siteToVisit) {
      if(!this.currentlyBlocking[siteToVisit.tabId]) {
        this.currentlyBlocking[siteToVisit.tabId] = { 
          isBlocking: true,
          url: this.getBaseUrl(siteToVisit.url)
        }
        this.blockSite(siteToVisit.tabId)
      }
    }

    this.onUpdateListener = function(tabId, tab) {
      if(tab.url) {
        console.log(this.currentlyBlocking)
        const baseUrl = this.getBaseUrl(tab.url)
        if(!this.checkIfInBlacklist(baseUrl)) {
          this.currentlyBlocking[tabId] = {
            isBlocking: false,
            url: baseUrl
          }
        } else if(tab.url != baseUrl) {
          this.blockSite(tabId)
          this.currentlyBlocking[tabId] = {
            isBlocking: true,
            url: baseUrl
          }
        }
      }
    }

    this.onUpdateHandler = this.onUpdateListener.bind(this)
    this.blockingHandler = this.blockingListener.bind(this)
  }

  blockSite(tabId) {
    browser.tabs.executeScript(tabId, {
      file: 'content/block.js'
    }).then(() => {}).catch(err => console.log('err', err))
  }

  getBaseUrl(urlToParse) {
    const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g
    const filteredURL = urlToParse.match(regex)
    if(filteredURL.length > 0) {
      return filteredURL[0]
    }
    return ''
  }

  checkIfInBlacklist(url) {
    if(this.blacklist[url]) {
      return true
    }
    return false
  }

  checkAllTabs() {
    browser.tabs.query({windowId: null}).then(tabs => {
      tabs.forEach(tab => {
        if(this.checkIfInBlacklist(this.getBaseUrl(tab.url))) {
          this.blockSite(tab.id)
        }
      })
    })
  }

  setListeners() {
    browser.tabs.onUpdated.addListener(this.onUpdateHandler)
    browser.webNavigation.onDOMContentLoaded.addListener(this.blockingHandler)
  }

  removeListeners() {
    console.log('removing')
    browser.tabs.onUpdated.removeListener(this.onUpdateHandler)
    browser.webNavigation.onDOMContentLoaded.removeListener(this.blockingHandler)
  }
}