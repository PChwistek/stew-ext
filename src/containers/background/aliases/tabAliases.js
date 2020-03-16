import { compareObjects } from '../../utils'
import axios from 'axios'
import manager from '../TabManager'

import { 
  TABS_SETSNAP, 
  TABS_DELETERECIPE_PENDING,
  TABS_DELETERECIPE_FAILED,
  TABS_DELETERECIPE_SUCCESS,
  TABS_SAVERECIPE_FAILED,
  TABS_SAVERECIPE_PENDING,
  TABS_SAVERECIPE_SUCCESS,
  TABS_LAUNCHRECIPE_PENDING,
  TABS_LAUNCHRECIPE_SUCCESS,
  TABS_SETSNAP_EXISTING,
} from '../../actionTypes'

import getServerHostname from '../../getServerHostName'
import { toggleSlide } from '../../popup/popup.actions'
import { handle401 } from './authAliases'
import { selectRecipe, setSearchRowAlias } from './searchAliases'
import { toggleEditAlias } from './popupAliases'

const serverUrl = getServerHostname()

export const getCurrentSession = (originalAction) => {
  return async (dispatch, getState) => {
    const { tabs } = getState()
    const session = await manager.getSession(tabs.currentWindow.id)
    dispatch({
      type: TABS_SETSNAP,
      payload: {
        session
      }
    })
  }
}

export const launchRecipeConfiguration = (originalAction) => {
  return async dispatch => {
    dispatch({ type: TABS_LAUNCHRECIPE_PENDING })
    await manager.nukeAndReplace(originalAction.payload.recipe.config)
    dispatch({ type: TABS_LAUNCHRECIPE_SUCCESS })
  }
}

export const saveRecipeAlias = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: TABS_SAVERECIPE_PENDING })
      const tabsState = getState().tabs
      const authState = getState().auth
      const searchState = getState().search

      const { isNew } = tabsState
      const { jwt } = authState
      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      }

      const newConfig = []
      let titlesForSearch = []
      for (let index = 0; index < tabsState.session.length; index++) {
        const win = tabsState.session[index]

        titlesForSearch = titlesForSearch.concat(win.tabs.map(tab => tab.title))

        newConfig.push(
          {
          tabs: win.tabs.map(tab => ({
            favIconUrl: tab.favIconUrl, 
            url: tab.url,
            title: tab.title,
            index: tab.index
          }))
        })
      }

      const theRecipe = {
        name: tabsState.recipeForm.recipeName,
        author: authState.loggedInAs,
        tags: tabsState.recipeForm.recipeTags,
        titles: titlesForSearch,
        attributes: [],
        config: newConfig,
      }

      if(!isNew) {
        const { selectedRecipe } = searchState
        console.log('selectedRecipe', selectedRecipe)
        console.log('the recipe', theRecipe)
        theRecipe._id = selectedRecipe._id

        const areSame = compareObjects(
          { name: theRecipe.name, tags: theRecipe.tags, config: theRecipe.config}, 
          { name: selectedRecipe.name, tags: selectedRecipe.tags, config: selectedRecipe.config}
        )

        if(!areSame) {
          const { data: recipeFromServer } = await axios.patch(`${serverUrl}/recipe/edit`, {...theRecipe}, config)
          dispatch(selectRecipe(recipeFromServer))
          await manager.updateRecipeInStore(recipeFromServer)
        }
        
      } else {
        const { data: recipeFromServer } = await axios.post(`${serverUrl}/recipe/create`, {...theRecipe }, config)
        dispatch(selectRecipe(recipeFromServer))
        await manager.addRecipeToStore(recipeFromServer)
      }
      dispatch(toggleEditAlias())
      dispatch(getInitialResults())
      dispatch({ type: TABS_SAVERECIPE_SUCCESS })
     
    } catch(err) {
      console.log(err)
      if(err && err.status) {
        handle401(err)
      }
      dispatch({ type: TABS_SAVERECIPE_FAILED })
    } 
  }
}


export const selectRecipeFromRow = (originalAction) => {
  const { rowIndex } = originalAction.payload
  return (dispatch, getState) => {
    const { results } = getState().search
    const selectedRecipe = results[rowIndex]
    dispatch({
      type: TABS_SETSNAP_EXISTING,
      payload: {
        session: selectedRecipe.config,
      }
    })
    dispatch(setSearchRowAlias(rowIndex))
    dispatch(selectRecipe(selectedRecipe))
  }
}

export const removeRecipe = () => {
  return async (dispatch, getState) => {
    const { selectedRecipe } = getState().search
    const authState = getState().auth
    const { jwt } = authState
    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    }
    dispatch({ type: TABS_DELETERECIPE_PENDING })
    await manager.removeRecipeFromStore(selectedRecipe)
    axios
      .post(`${serverUrl}/recipe/delete`, {
        _id: selectedRecipe._id
      }, config)
      .then(res => {
        dispatch(toggleSlide(false))
        dispatch({ type: TABS_DELETERECIPE_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: TABS_DELETERECIPE_FAILED })
        if(err && err.status) {
          handle401(err)
        }
      })
  }
}