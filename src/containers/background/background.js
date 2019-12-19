import store from './store'
import browser from 'webextension-polyfill'


browser.commands.onCommand.addListener(function(command) {
  console.log('Command:', command)
})