import React from 'react'
import { storiesOf } from '@storybook/react'
import Popup from '../../containers/popup/Popup'
import TestProvider from './TestProvider'

import store from '../store.test'

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