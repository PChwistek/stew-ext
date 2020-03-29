import browser from 'webextension-polyfill'
import * as JsSearch from 'js-search'
import { stemmer } from 'porter-stemmer'

class Manager {

  constructor() {}

  async getAuth() {
    const saved = await browser.storage.local.get('stew_auth')
    return saved.stew_auth || { jwt: null, username: null, lastUpdated: null }
  }

  async setAuth({ jwt, username, lastUpdated}) {
    const stew_auth =  { jwt, username, lastUpdated }
    await browser.storage.local.set({ stew_auth })
    this.getAuth()
  }

  async getSession(idOfLastActiveWindow) {
    let windows = await browser.windows.getAll()
    windows = windows.filter(win => win.type === 'normal')
    const indexOfwindow = windows.findIndex(win => win.id === idOfLastActiveWindow)
    
    windows.unshift(windows.splice(indexOfwindow, 1)[0])

    let session = []

    var i = 0
    for (i = 0; i < windows.length; i++) {
      const index = i
      const windowTabs = await browser.tabs.query({ windowId: windows[i].id})
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
      browser.windows.create({ url: recipeWindow.tabs.map(tab => tab.url )})
    })
  }

  async addRecipeToStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    recipes = recipes || []
    recipes.push(recipe)

    browser.storage.local.set({ stew: { recipes } })

    return recipes
  }

  async updateRecipeInStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    const theIndex = recipes.findIndex(existingRecipe => existingRecipe._id === recipe._id)
    recipes[theIndex] = recipe
    await browser.storage.local.set({ stew: { recipes } })
    return recipes
  }

  async removeRecipeFromStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    const theIndex = recipes.findIndex(existingRecipe => existingRecipe._id === recipe._id)
    recipes.splice(theIndex, 1)
    await browser.storage.local.set({ stew: { recipes } })
    return recipes  
  }

  async updateRecipesFromServer(newRecipes) {
    browser.storage.local.set({ stew: { recipes: newRecipes } })
      .then(() => {
    })
  }

  async fetchAllRecipes() {
    const theResult = await browser.storage.local.get('stew')
    if(theResult.stew) {
      return theResult.stew.recipes 
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

}

const manager = new Manager()
export default manager
