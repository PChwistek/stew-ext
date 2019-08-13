import store from './store'
import Blocker from './blocker'
import Manager from './tabmanager'
import socket from './socket'

const blacklist = {
  'https://www.facebook.com': true,
  'https://www.reddit.com': true,
  'https://www.youtube.com': true,
  'https://twitter.com': true
}

const blocker = new Blocker(blacklist)

blocker.setListeners()
blocker.checkAllTabs()
// setTimeout(() => blocker.removeListeners(), 10000)


const startupTabs = [
  'http://localhost:64690/', 
  'https://stackoverflow.com/', 
  'https://www.google.com/', 
  'https://developer.chrome.com/extensions/tabs#method-remove'
]

const manager = new Manager(4, startupTabs)
manager.nukeAndReplace() // need to fix this one here...
manager.setTabLimits()
socket()
