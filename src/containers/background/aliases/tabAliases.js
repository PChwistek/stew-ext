import axios from 'axios'
import { compareObjects } from 'Containers/utils'
import { defaultManager as manager } from '../tabmanager'
import getServerHostname from 'Containers/getServerHostName'
import { toggleSlide } from 'Popup/popup.actions'
import { handle401 } from './authAliases'
import { selectRecipe, setSearchRowAlias, getInitialResults } from './searchAliases'
import { toggleEditAlias } from './popupAliases'
import { cloneDeep } from 'lodash'


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
  TABS_QUICKADD_ALIAS,
  TABS_MERGE_SESSION_ALIAS,
  TABS_MOVE_TAB_ALIAS
} from 'Containers/actionTypes'

const serverUrl = getServerHostname()

export const getCurrentSession = (originalAction) => {
  return async (dispatch, getState) => {
    const { tabs } = getState()
    const session = await manager.getSession(tabs.currentWindow.id)
    
    const newConfig = []
    for (let index = 0; index < session.length; index++) {
      const win = session[index]
      newConfig.push(
        {
        tabs: win.tabs.map((tab, index) => ({
          favIconUrl: tab.favIconUrl, 
          url: tab.url,
          title: tab.title,
          index: index
        }))
      })
    }

    dispatch({
      type: TABS_SETSNAP,
      payload: {
        session: newConfig,
        forced: originalAction.payload ? originalAction.payload.forced : false
      }
    })
  }
}

export const launchRecipeConfiguration = (originalAction) => {
  return async dispatch => {
    dispatch({ type: TABS_LAUNCHRECIPE_PENDING })
    manager.nukeAndReplace(originalAction.payload.recipe.config)
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
      const { jwt, userId } = authState

      const config = {
        headers: { Authorization: `Bearer ${jwt}` }
      }

      let titlesForSearch = []
      for (let index = 0; index < tabsState.recipeSession.length; index++) {
        const win = tabsState.recipeSession[index]
        titlesForSearch = titlesForSearch.concat(win.tabs.map(tab => tab.title))
      }

      const theRecipe = {
        name: tabsState.recipeForm.recipeName,
        author: authState.loggedInAs,
        tags: tabsState.recipeForm.recipeTags,
        titles: titlesForSearch,
        attributes: [],
        config: tabsState.recipeSession,
      }
     
      if(!isNew) {
        const { selectedRecipe } = searchState
        theRecipe._id = selectedRecipe._id
        
        if (selectedRecipe.authorId !== userId) {
          theRecipe.forkedFromId = selectedRecipe.shareableId
          const { data: recipeFromServer } = await axios.patch(`${serverUrl}/recipe/edit`, {...theRecipe}, config)
          dispatch(selectRecipe(recipeFromServer))
          await manager.addRecipeToStore(recipeFromServer)

        } else {
          const areSame = compareObjects(
            { name: theRecipe.name, tags: theRecipe.tags, config: theRecipe.config}, 
            { name: selectedRecipe.name, tags: selectedRecipe.tags, config: selectedRecipe.config}
          )
          
          if(!areSame) {
            const { data: recipeFromServer } = await axios.patch(`${serverUrl}/recipe/edit`, {...theRecipe}, config)
            dispatch(selectRecipe(recipeFromServer))
            await manager.updateRecipeInStore(recipeFromServer)
          }
        }
        
      } else {
        const { data: recipeFromServer } = await axios.post(`${serverUrl}/recipe/create`, {...theRecipe }, config)
        dispatch(selectRecipe(recipeFromServer))
        await manager.addRecipeToStore(recipeFromServer)
      }

      dispatch(toggleEditAlias({ payload: { forced: false }}))
      dispatch({ type: TABS_SAVERECIPE_SUCCESS })
      dispatch(getInitialResults())

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
    dispatch(getInitialResults())
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

export const quickAddAlias = () => {
  return (dispatch, getState) => {
    const { currentTab, recipeSession } = getState().tabs
    const { selectedRecipe } = getState().search

    if(recipeSession.length > 0) {
      recipeSession[0].tabs.unshift({ ...currentTab })
    } else {
      recipeSession.push({ tabs: [ { ...currentTab } ]})
    }
    dispatch({
      type: TABS_QUICKADD_ALIAS,
      payload: {
        recipeName: selectedRecipe.name,
        recipeTags: selectedRecipe.tags,
        session: recipeSession
      }
    })

    dispatch(saveRecipeAlias())
  }
}

export const mergeSessionAlias = () => {
  return (dispatch, getState) => {
    const { session, recipeSession, isNew } = getState().tabs
    let newSession = []

    if(!isNew) {
      let windowCount = 0
      while(windowCount < session.length && windowCount < recipeSession.length) {
        const sessionWindow = session[windowCount]
        const recipeWindow = recipeSession[windowCount]
        let tabsNotInRecipe = sessionWindow.tabs.filter(tab => recipeWindow.tabs.findIndex(recipeTab => recipeTab.url === tab.url) === -1)
        recipeWindow.tabs = [...recipeWindow.tabs, ...tabsNotInRecipe]
        newSession.push(recipeWindow)
        windowCount += 1
      }
      
      if (windowCount === recipeSession.length) {
        for (let index = windowCount; index < session.length; index++) {
          const nextWindow = session[index]
          newSession.push(nextWindow)
        }
      }
    } else {
      newSession = session
    }
  

    dispatch({
      type: TABS_MERGE_SESSION_ALIAS,
      payload: {
        session: newSession
      }
    })
  }
}


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

export function moveTabAlias(originalAction) {
  const {
    source,
    destination
  } = originalAction.payload

  return (dispatch, getState) => {
    let recipeSession = [...cloneDeep(getState().tabs.recipeSession)]

    if(!destination) return 
    if(destination.droppableId === 'new') {
      recipeSession.push({ tabs: [] })
      const sourceDropId = parseInt(source.droppableId)
      const destDropId = recipeSession.length - 1

      const result = move(
        recipeSession[sourceDropId].tabs,
        recipeSession[destDropId].tabs,
        source,
        { droppableId: recipeSession.length - 1 }
      )

      recipeSession[sourceDropId].tabs = result[sourceDropId]
      recipeSession[destDropId].tabs = result[destDropId]

      const temp = recipeSession[0]
      recipeSession[0] = recipeSession[recipeSession.length - 1]
      recipeSession[recipeSession.length - 1] = temp

    } else {
      const sourceDropId = parseInt(source.droppableId)
      const destDropId = parseInt(destination.droppableId)
  
      if (sourceDropId === destDropId) {
        const items = reorder(
            recipeSession[sourceDropId].tabs,
            source.index,
            destination.index
        )
        recipeSession[sourceDropId].tabs = items

      } else {
        const result = move(
            recipeSession[sourceDropId].tabs,
            recipeSession[destDropId].tabs,
            source,
            destination
        )
        recipeSession[sourceDropId].tabs = result[sourceDropId]
        recipeSession[destDropId].tabs = result[destDropId]
      }
    }

    recipeSession = recipeSession.filter(win => win.tabs.length > 0)

    dispatch({
      type: TABS_MOVE_TAB_ALIAS,
      payload: {
        recipeSession,
      }
    })
  }
}