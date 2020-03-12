import browser from 'webextension-polyfill'
import * as JsSearch from 'js-search'
import { stemmer } from 'porter-stemmer'

export default class Manager {

  constructor() {
  }

  async getSession() {
    let windows = await browser.windows.getAll()
    windows = windows.filter(win => win.type === 'normal')
    
    let session = []

    var i = 0
    for (i = 0; i < windows.length; i++) {
      const index = i
      const windowTabs = await browser.tabs.query({ windowId: windows[index].id})
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

    browser.storage.sync.set({ stew: { recipes } })

    return recipes
  }

  async updateRecipeInStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    const theIndex = recipes.findIndex(existingRecipe => existingRecipe._id === recipe._id)
    recipes[theIndex] = recipe
    await browser.storage.sync.set({ stew: { recipes } })
    return recipes
  }

  async removeRecipeFromStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    const theIndex = recipes.findIndex(existingRecipe => existingRecipe._id === recipe._id)
    recipes.splice(theIndex, 1)
    await browser.storage.sync.set({ stew: { recipes } })
    return recipes  
  }

  async updateRecipesFromServer(newRecipes) {
    browser.storage.sync.set({ stew: { recipes: newRecipes } })
      .then(() => {
        // console.log('updated from server')
    })
  }

  async fetchAllRecipes() {
    const theResult = await browser.storage.sync.get('stew')
    return theResult.stew.recipes 
  }

  async searchRecipes(searchTerm, { sortedBy, filterList }) {
    console.log(sortedBy, filterList)
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