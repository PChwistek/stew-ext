import { Manager } from 'Containers/background/TabManager'
import { newRecipe } from './stories/testSearchState'

import browser from './mocks/browser'

const manager = new Manager('test_stew', browser)

test('should have storage key of "test_stew" ', () => {
  expect(manager.storageKey).toEqual('test_stew')
})

test('it should not have any storage', async () => {
    const { jwt, username, lastUpdated } = await manager.getAuth()
    expect(jwt).toBeNull()
    expect(username).toBeNull()
    expect(lastUpdated).toBeNull()
})
test('it should store authentication', async () => {
    const toAuthSave = {
      jwt: '123456',
      username: 'test',
      lastUpdated: 'today'
    }

    const { jwt, username, lastUpdated } = await manager.setAuth({ ...toAuthSave })
    expect(jwt).toBe(toAuthSave.jwt)
    expect(username).toBe(toAuthSave.username)
    expect(lastUpdated).toBe(toAuthSave.lastUpdated)
})

test('it should grab the sessions of a window', async () => {
    const theTabs = await manager.getSession(0)
    expect(theTabs).toEqual([
      { 
         index: 0,
         tabs: [ 
           { favIconUrl: '',
              index: 0,
              title: 'Extensions',
              url: 'chrome://extensions/' },
            { favIconUrl:
               'https://img.itch.zone/aW1nLzIzNjU2MzQucG5n/32x32%23/HGpTx0.png',
              index: 1,
              title: 'DragonRuby Game Toolkit by DragonRuby',
              url: 'https://dragonruby.itch.io/dragonruby-gtk' 
            },
            { favIconUrl: 'https://www.google.com/favicon.ico',
              index: 0,
              title: 'Google',
              url: 'https://www.google.com/' } 
            ] 
        } 
      ])
})

test('it should save a new recipe', async () => {
    const newRecipes = await manager.addRecipeToStore(newRecipe)
    const array = []
    array.push(newRecipe)
    expect(newRecipes).toEqual(array)
})

test('it should update an existing recipe', async () => {
    const updatedRecipe = { ...newRecipe, name: 'New Test Update' }
    const array = []
    array.push(updatedRecipe)
    const updatedRecipesFromStore = await manager.updateRecipeInStore(updatedRecipe)
    expect(updatedRecipesFromStore).toEqual(array)
})

test('it should get all current recipes', async () => {
    const updatedRecipe = { ...newRecipe, name: 'New Test Update' }
    const array = []
    array.push(updatedRecipe)
    const fromStore = await manager.fetchAllRecipes()
    expect(fromStore).toEqual(array)
})

test('it should show search results', async () => {
    const updatedRecipe = { ...newRecipe, name: 'New Test Update' }
    const array = []
    array.push(updatedRecipe)

    const results = await manager.searchRecipes('blah blah', { sortedBy: [], filterList: [] }) 
    expect(results).toEqual([])

    const newResults = await manager.searchRecipes('Update', { sortedBy: [], filterList: [] })
    expect(newResults).toEqual(array)
})

test('it should remove an existing recipe', async () => {
  const array = []
  const updatedRecipesFromStore = await manager.removeRecipeFromStore(newRecipe)
  expect(updatedRecipesFromStore).toEqual(array)
})
