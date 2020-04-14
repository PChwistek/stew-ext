import React from 'react'
import { storiesOf } from '@storybook/react'
import Popup from 'Popup/Popup.container'
import TestProvider from './TestProvider'

import store from '../testStore'

const withProvider = (story) => (
  <TestProvider store={store}>
    { story() }
  </TestProvider>
)

storiesOf('Popup', module)
  .addDecorator(withProvider)
  .add('initial', () => (
    <Popup 
    />
  ))