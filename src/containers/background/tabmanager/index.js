import browser from 'webextension-polyfill'
import * as JsSearch from 'js-search'
import { stemmer } from 'porter-stemmer'

export class Manager {

  constructor(storageKey, browserAPI) {
    this.storageKey = storageKey;
    this.browserAPI = browserAPI || browser
  }

  async getAuth() {
    const saved = await this.browserAPI.storage.local.get(`${this.storageKey}_auth`)
    return saved[`${this.storageKey}_auth`] || { jwt: null, username: null, lastUpdated: null, userId: null, }
  }

  async setAuth({ jwt, username, lastUpdated, userId }) {
    const stew_auth =  { jwt, username, lastUpdated, userId }
    await this.browserAPI.storage.local.set({ [`${this.storageKey}_auth`]: stew_auth })
    return await this.getAuth()
  }

  async getSettings() {
    const saved = await this.browserAPI.storage.local.get(`${this.storageKey}_settings`)
    return saved[`${this.storageKey}_settings`] || { cleanWorkspace: null, quickAdd: null, mergeHelper: null }
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
        if (theWindow.id !== currentWindowId) {
          await this.browserAPI.windows.remove(theWindow.id)
        }
      }

      const tabs = await this.browserAPI.tabs.query({ windowId: currentWindowId })
      await this.browserAPI.tabs.update(tabs[0].id, { url: desiredTabs[0].tabs[0].url })
      tabs.shift()
      await this.browserAPI.tabs.remove(tabs.map(tab => tab.id))

      for (let index = 1; index < desiredTabs[0].tabs.length; index++) {
        const newUrl = desiredTabs[0].tabs[index].url
        await this.browserAPI.tabs.create({ url: newUrl })
      }

      if(desiredTabs.length > 1) {
        desiredTabs.shift()
        desiredTabs.map( (recipeWindow, index) => {
          this.browserAPI.windows.create({ url: recipeWindow.tabs.map(tab => tab.url )})
        })
      }

    } else {
      desiredTabs.map( (recipeWindow, index) => {
        this.browserAPI.windows.create({ url: recipeWindow.tabs.map(tab => tab.url )})
      })
    }
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

  async searchRecipes(searchTerm, { sortedBy, filterList }) {
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
      results = results.filter(recipe => filterList.findIndex(fav => fav == recipe._id) > -1)
    }

    return results
  }

  async clear() {
    await this.browserAPI.storage.local.clear()
  }

}

export const defaultManager = new Manager('stew')