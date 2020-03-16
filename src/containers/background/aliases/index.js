import browser from 'webextension-polyfill'

import { 
  TABS_SNAP, 
  AUTH_LOGIN, 
  AUTH_LOGOUT,
  TABS_SAVERECIPE,
  TABS_DELETERECIPE,
  TABS_LAUNCHRECIPE,
  SEARCH_SETROW,
  SEARCH_GET_INITIAL_RESULTS,
  SEARCH_SETSEARCHTERMS_POPUP,
  POPUP_OPENED,
  SEARCH_SETSORTBY,
  POPUP_TOGGLEEDITING,
  TABS_QUICKADD
} from '../../actionTypes'

import { 
  getCurrentSession, 
  launchRecipeConfiguration, 
  saveRecipeAlias, 
  selectRecipeFromRow, 
  removeRecipe, 
  quickAddAlias 
} from './tabAliases'

import { popupSync, toggleEditAlias, } from './popupAliases'
import { login, authLogoutAlias } from './authAliases.js'
import { getInitialResults, searchRecipes, sortBySearch } from './searchAliases'

if(process.env.NODE_ENV === 'development') {
  browser.storage.local.clear().then(() => {
    browser.storage.local.set({ stew: { recipes: [] } })
      .then(() => {
        console.log('cache redone')
      })
  })
}

export default {
  [TABS_SNAP]: getCurrentSession,
  [AUTH_LOGIN]: login,
  [TABS_SAVERECIPE]: saveRecipeAlias,
  [SEARCH_SETSEARCHTERMS_POPUP]: searchRecipes,
  [SEARCH_GET_INITIAL_RESULTS]: getInitialResults,
  [TABS_LAUNCHRECIPE]: launchRecipeConfiguration,
  [POPUP_OPENED]: popupSync,
  [SEARCH_SETROW]: selectRecipeFromRow,
  [TABS_DELETERECIPE]: removeRecipe,
  [AUTH_LOGOUT]: authLogoutAlias,
  [SEARCH_SETSORTBY]: sortBySearch,
  [POPUP_TOGGLEEDITING]: toggleEditAlias,
  [TABS_QUICKADD]: quickAddAlias,
}