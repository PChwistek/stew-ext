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
    this.removeListeners()
    browser.tabs.query({windowId: null}).then(tabs => {
      browser.tabs.update(tabs[0].id, { url: this.desiredTabs[0] })
      tabs.shift()
      browser.tabs.remove(tabs.map(tab => tab.id)).then(() => {})
    })
  
    for (let index = 1; index < this.desiredTabs.length; index++) {
      const newUrl = this.desiredTabs[index]
      browser.tabs.create({ url: newUrl })
    }
  }

  async addRecipeToStore(recipe) {
    let recipes = await this.fetchAllRecipes()
    console.log('before adding', recipes)
    recipes = recipes || []
    recipes.push(recipe)

    const newStew = {
      recipes
    } 

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
    const search = new JsSearch.Search('name')
    search.addIndex('author')

    search.addDocuments(allRecipes)

    const results = search.search(searchTerm)
    console.log(`results for ${searchTerm}`, search.search(searchTerm))

    return results
  }

}