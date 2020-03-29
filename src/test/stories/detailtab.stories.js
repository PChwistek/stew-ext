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
  TABS_SETSNAP_EXISTING
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
