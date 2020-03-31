import React from 'react'
import { storiesOf } from '@storybook/react'
import Search from 'Popup/Search'

storiesOf('Search', module)
  .add('initial', () => (
    <Search onPlusClick={ () => {} } setSearchTerms={ () => {} } terms={ '' } />
  ))
  .add('with terms', () => (
    <Search onPlusClick={ () => {} } setSearchTerms={ () => {} } terms={ 'something' } />
  ))
