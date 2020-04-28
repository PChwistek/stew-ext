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

  nukeAndReplace(desiredTabs) {
    desiredTabs.map( (recipeWindow, index) => {
      this.browserAPI.windows.create({ url: recipeWindow.tabs.map(tab => tab.url )})
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
      switch(sortedBy) {
        case 'favorites':
          results = results.filter(recipe => filterList.findIndex(fav => fav == recipe._id) > -1)
          break
      }
    }

    return results
  }

  async clear() {
    await this.browserAPI.storage.local.clear()
  }

}

export const defaultManager = new Manager('stew')