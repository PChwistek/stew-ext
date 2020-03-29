import React from 'react'
import { storiesOf } from '@storybook/react'
import Table from 'Popup/Table'
import TestProvider from './TestProvider'
import store from '../testStore'
import { results } from './testSearchState'

import {
  SEARCH_SETSEARCHTERMS_ALIAS,
  SEARCH_RESET,
  SEARCH_SETRESULTS_SUCCESS,
  SEARCH_SETFAVORITE_ALIAS,
  SEARCH_NEXTROW,
  SEARCH_PREVIOUSROW,
  SEARCH_SETSORTBY_ALIAS
} from 'Containers/actionTypes'

import { searchRecipes } from 'Background/aliases/searchAliases'

const withProvider = (story) => (
  <TestProvider store={store}>
    { story() }
  </TestProvider>
)

const fakeResults = results

storiesOf('Table', module)
  .addDecorator(withProvider)
  .add('initial', () => {
    store.dispatch({
      type: SEARCH_RESET
    })
    return <Table />
  })
  .add('A little search', () => {
    store.dispatch({
      type: SEARCH_SETSEARCHTERMS_ALIAS,
      payload: { 
        searchTerms: 'test' 
      }
    })
    return <Table />
  })
  .add('Search for favorites', () => {
    store.dispatch({
      type: SEARCH_RESET
    })
    store.dispatch({
      type: SEARCH_SETSORTBY_ALIAS,
      payload: {
        sortedBy: 'favorites'
      }
    })
    return <Table />
  })
  .add('Search for all', () => {
    store.dispatch({
      type: SEARCH_RESET
    })
    store.dispatch({
      type: SEARCH_SETSORTBY_ALIAS,
      payload: {
        sortedBy: 'all'
      }
    })
    return <Table />
  })
  .add('Add some results', () => {
    store.dispatch({
      type: SEARCH_RESET
    })

    store.dispatch({
      type: SEARCH_SETRESULTS_SUCCESS,
      payload: {
        results: fakeResults,
      }
    })

    return <Table />
  })
  .add('Add a favorite', () => {
    store.dispatch({
      type: SEARCH_SETFAVORITE_ALIAS,
      payload: {
        favs: ['5e75978d46274611f100dfc0']
      }
    })
    return <Table />
  })
  .add('Examine next row', () => {
    store.dispatch({ 
      type: SEARCH_NEXTROW
    })
    return <Table />
  }).add('Examine previous row', () => {
    store.dispatch({ 
      type: SEARCH_PREVIOUSROW
    })
    return <Table />
  })
  .add('Examine previous row again', () => {
    store.dispatch({ 
      type: SEARCH_PREVIOUSROW
    })
    return <Table />
  })