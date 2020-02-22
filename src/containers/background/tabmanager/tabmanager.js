import browser from 'webextension-polyfill'
import * as JsSearch from 'js-search'

export default class Manager {

  constructor() {
    browser.storage.local.clear().then(() => {
      browser.storage.local.set({ stew: { recipes: [] } })
        .then(() => {
          console.log('cache redone')
        })
    })
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
        id: windows[index].id,
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
    console.log('before adding', recipes)
    recipes = recipes || []
    recipes.push(recipe)

    const newStew = {
      recipes
    } 

    console.log('new recipe', newStew)

    browser.storage.local.set({ stew: newStew })

    return recipes
  }

  async fetchAllRecipes() {
    const theResult = await browser.storage.local.get('stew')
    return theResult.stew.recipes 
  }

  async searchRecipes(searchTerm) {
    const allRecipes = await this.fetchAllRecipes()
    console.log('all recipes in search', allRecipes)
    var search = new JsSearch.Search('uId')
    search.addIndex('name')
    search.addIndex('author')
    search.addIndex('tags')
    search.addIndex('titles')

    search.addDocuments(allRecipes)
    const results = search.search(searchTerm)
    console.log(`results for ${searchTerm}`, results)

    return results
  }

}