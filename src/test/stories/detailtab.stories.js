import React from 'react'
import { storiesOf } from '@storybook/react'
import DetailTab from 'Popup/DetailTab'
import TestProvider from './TestProvider'
import store from '../testStore'
import { results } from './testSearchState'

import {
  SEARCH_SETRESULTS_SUCCESS,
  SEARCH_SELECTRECIPE,
  TABS_SETCURRENTTAB,
  TABS_SETSNAP_EXISTING,
  SEARCH_SETFAVORITE_ALIAS,
  TABS_QUICKADD_ALIAS,
  POPUP_TOGGLEEDITING_ALIAS,
  TABS_SETRECIPEFORM,
  TABS_SETRECIPETAG,
  TABS_SETRECIPENAME,
  TABS_ADDRECIPETAG,
  TABS_REMOVEWINDOW,
  TABS_REMOVETAB
} from 'Containers/actionTypes'


const withProvider = (story) => (
  <TestProvider store={store}>
    { story() }
  </TestProvider>
)


storiesOf('DetailTab', module)
  .addDecorator(withProvider)
  .add('initial', () => {
    store.dispatch({
      type: SEARCH_SETRESULTS_SUCCESS,
      payload: {
        results: results
      }
    })
    store.dispatch({
      type: SEARCH_SELECTRECIPE,
      payload: {
        selectedRecipe: results[0]
      }
    })
    store.dispatch({
      type: TABS_SETSNAP_EXISTING,
      payload: {
        session: results[0].config
      }
    })

    return <DetailTab visible={ true } onCloseClick={ () => { } }  />
  })
  .add('New current tab', () => {
    store.dispatch({
      type: TABS_SETCURRENTTAB,
      payload: {
        currentTab: {
          favIconUrl: 'https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico',
          title: 'Facebook - Log In or Sign Up',
          url: 'https://www.facebook.com/'
        }
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })
  .add('Favorite the recipe', () => {
    store.dispatch({
      type: SEARCH_SETFAVORITE_ALIAS,
      payload: {
        favs: ['5e75978d46274611f100dfc0']
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })
  .add('Quick add to the recipe', () => {
    results[0].config[0].tabs.unshift({
      favIconUrl: 'https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico',
      title: 'Facebook - Log In or Sign Up',
      url: 'https://www.facebook.com/'
    })
    store.dispatch({
      type: TABS_QUICKADD_ALIAS,
      payload: {
        session: results[0].config
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })
  .add('Is editing', () => {
    store.dispatch({
      type: TABS_SETRECIPEFORM,
      payload: {
        recipeName: results[0].name,
        recipeTags: results[0].tags,
        isNew: false
      }
    })
    store.dispatch({
      type: POPUP_TOGGLEEDITING_ALIAS,
      payload: {
        forced: true
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })
  .add('Edit name', () => {
    store.dispatch({
      type: TABS_SETRECIPENAME,
      payload: {
        recipeName: 'Edited Name',
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })
  .add('Write a tag', () => {
    store.dispatch({
      type: TABS_SETRECIPETAG,
      payload: {
        recipeTag: 'some tag'
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })
  .add('save a tag', () => {
    store.dispatch({
      type: TABS_ADDRECIPETAG,
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })
  .add('Remove first window', () => {
    store.dispatch({
      type: TABS_REMOVEWINDOW,
      payload: {
        windowIndex: 0
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  }).add('Remove second tab', () => {
    store.dispatch({
      type: TABS_REMOVETAB,
      payload: {
        win: 0,
        tab: 1
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })
  .add('Save new version', () => {
    store.dispatch({
      type: POPUP_TOGGLEEDITING_ALIAS,
      payload: {
        forced: false
      }
    })
    return <DetailTab visible={ true } onCloseClick={ () => { } } />
  })