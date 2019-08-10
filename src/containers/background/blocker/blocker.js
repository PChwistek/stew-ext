import browser from 'webextension-polyfill'

const blacklist = {
  'https://www.facebook.com': true,
  'https://www.reddit.com': true,
  'https://www.youtube.com': true,
  'https://twitter.com': true
}

const currentlyBlocking = {}

function checkIfInBlacklist(url) {
  const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g // verifies domain is actually a link
  const filteredURL = url.match(regex)[0]
  if(blacklist[filteredURL]) {
    return true
  }
  return false
}

function checkAllTabs() {
  browser.tabs.getAllInWindow(tabs => {
    tabs.forEach(tab => {
      if(checkIfInBlacklist(tab.url)) {
        console.log('block it', tab)
        browser.tabs.executeScript(tab.id, {
          file: 'content/block.js'
        }).then(res => console.log(res)).catch(err => console.log('err', err))
      }
    })
  })
}

function setListeners() {
  browser.tabs.onCreated.addListener(tabId => {
    console.log('tab created', tabId)
  })

  browser.tabs.onUpdated.addListener(tabId => {
    console.log('currently', currentlyBlocking)
    browser.tabs.get(tabId).then(tab => {
      if(!checkIfInBlacklist(tab.url)) {
        currentlyBlocking[tabId] = false
      }
    })
  })

  browser.webNavigation.onDOMContentLoaded.addListener(siteToVisit => {
    if(checkIfInBlacklist(siteToVisit.url)) {
      if(!currentlyBlocking[siteToVisit.tabId]) {
        currentlyBlocking[siteToVisit.tabId] = true
        browser.tabs.executeScript(siteToVisit.tabId, {
          file: 'content/block.js'
        }).then(res => console.log(res)).catch(err => console.log('err', err))
      }
    }
  })
}

export default {
  setListeners,
  checkAllTabs
}

