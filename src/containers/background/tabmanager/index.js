import browser from 'webextension-polyfill'
import * as JsSearch from 'js-search'
import { stemmer } from 'porter-stemmer'

export class Manager {

  constructor(storageKey, browserAPI) {
    this.storageKey = storageKey;
    this.browserAPI = browserAPI || browser
  }

  async getSortBys() {
    const saved = await this.browserAPI.storage.local.get(`${this.storageKey}_sortBys`)
    return saved[`${this.storageKey}_sortBys`] || { repos: null, favorites: null }
  }

  async getNoticeIsInstalled() {
    return await this.browserAPI.storage.local.get(`${this.storageKey}_install-time`)
  }

  async installNotice() {
    const isInstalled = await this.getNoticeIsInstalled()
    console.log('is installed', isInstalled)
    if (isInstalled['stew_install-time']) {
      return
    }
  
    var now = new Date().getTime();
    this.browserAPI.storage.local.set({ [`${this.storageKey}_install-time`]: now })
    this.browserAPI.tabs.create({url: "https://www.getstew.com/faq"})
  }

  async setSortBys({ favorites, repos }) {
    const stew_sortBys =  { favorites, repos }
    await this.browserAPI.storage.local.set({ [`${this.storageKey}_sortBys`]: stew_sortBys })
    return await this.getSortBys()
  }

  async getAuth() {
    const saved = await this.browserAPI.storage.local.get(`${this.storageKey}_auth`)
    return saved[`${this.storageKey}_auth`] || { jwt: null, username: null, lastUpdated: null, userId: null, orgs: null }
  }

  async setAuth({ jwt, username, lastUpdated, userId, orgs }) {
    const stew_auth =  { jwt, username, lastUpdated, userId, orgs }
    await this.browserAPI.storage.local.set({ [`${this.storageKey}_auth`]: stew_auth })
    return await this.getAuth()
  }

  async getSettings() {
    const saved = await this.browserAPI.storage.local.get(`${this.storageKey}_settings`)
    return saved[`${this.storageKey}_settings`] || { cleanWorkspace: false, quickAdd: true, mergeHelper: true }
  }

  async setSettings({ cleanWorkspace, quickAdd, mergeHelper }) {
    const stew_settings =  { cleanWorkspace, quickAdd, mergeHelper}
    await this.browserAPI.storage.local.set({ [`${this.storageKey}_settings`]: stew_settings })
    return await this.getSettings()
  }

  async getSession(idOfLastActiveWindow) {
    let windows = await this.browserAPI.windows.getAll()
    windows = windows.filter(win => win.type === 'normal')
    const indexOfwindow = windows.findIndex(win => win.id === idOfLastActiveWindow)
    
    windows.unshift(windows.splice(indexOfwindow, 1)[0])

    let session = []

    var i = 0
    for (i = 0; i < windows.length; i++) {
      const index = i
      const windowTabs = await this.browserAPI.tabs.query({ windowId: windows[i].id})
      const win = {
        index: index,
        tabs: windowTabs
      }
      session.push(win)
    }    

    return session
  }

  async nukeAndReplace(desiredTabs, currentWindowId) {

    const { cleanWorkspace } = await this.getSettings()
    
    if (cleanWorkspace) {
      const currentWindows = await this.browserAPI.windows.getAll()
      for (let index = 0; index < currentWindows.length; index++) {
        const theWindow = currentWindows[index]
        if (theWindow && theWindow.type !== 'popup') {
          await this.browserAPI.windows.remove(theWindow.id)
        } 
      }
    }

    desiredTabs.map( async (recipeWindow, index) => {
      await this.browserAPI.windows.create({ url: recipeWindow.tabs.map(tab => tab.url )})
    })
  }

  async addRecipeToStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    recipes = recipes || []
    recipes.push(recipe)

    this.browserAPI.storage.local.set({ [`${this.storageKey}`]: { recipes } })

    return recipes
  }

  async updateRecipeInStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    const theIndex = recipes.findIndex(existingRecipe => existingRecipe._id === recipe._id)
    recipes[theIndex] = recipe
    await this.browserAPI.storage.local.set({ [`${this.storageKey}`]: { recipes } })
    return recipes
  }

  async removeRecipeFromStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    const theIndex = recipes.findIndex(existingRecipe => existingRecipe._id === recipe._id)
    recipes.splice(theIndex, 1)
    await this.browserAPI.storage.local.set({ [`${this.storageKey}`]: { recipes } })
    return recipes  
  }

  async updateRecipesFromServer(newRecipes) {
    this.browserAPI.storage.local.set({ [`${this.storageKey}`]: { recipes: newRecipes } })
      .then(() => {
    })
  }

  async fetchAllRecipes() {
    const theResult = await this.browserAPI.storage.local.get(this.storageKey)
    if(theResult[`${this.storageKey}`]) {
      return theResult[`${this.storageKey}`].recipes 
    }
    return []
  }

  async searchRecipes(searchTerm, { sortedBy, filteredList }) {
    const allRecipes = await this.fetchAllRecipes()
    var search = new JsSearch.Search('_id')
    search.tokenizer = new JsSearch.StemmingTokenizer( stemmer, new JsSearch.SimpleTokenizer());
    search.addIndex('name')
    search.addIndex('author')
    search.addIndex('tags')
    search.addIndex('titles')

    search.addDocuments(allRecipes)
    let results = search.search(searchTerm)

    if(sortedBy) {
      switch(sortedBy) {
        case 'favorites':
          results = results.filter(recipe => filteredList.findIndex(fav => fav == recipe._id) > -1)
          break
      }
    }

    return results
  }

  async clear() {
    await this.browserAPI.storage.local.clear()
  }

  handleOAuth() {
    return new Promise( (resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if(!token) return reject('No token')
        this.browserAPI.storage.local.set({ [`${this.storageKey}_oauth`]: token })
        resolve(token)
      })
    })
  }

  async getOAuthToken() {
    const token = await this.browserAPI.storage.local.get(`${this.storageKey}_oauth`)
    return token[`${this.storageKey}_oauth`]
  }

  async revokeOAuthToken() {
    const token = await this.getOAuthToken()
    chrome.identity.removeCachedAuthToken({token})
    this.browserAPI.storage.local.set({ [`${this.storageKey}_oauth`]: null })
  }
}

export const defaultManager = new Manager('stew')