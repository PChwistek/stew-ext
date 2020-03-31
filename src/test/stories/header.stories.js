import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from 'Popup/Header'
import TestProvider from './TestProvider'
import store from '../testStore'

const withProvider = (story) => (
  <TestProvider store={store}>
    { story() }
  </TestProvider>
)

storiesOf('Header', module)
  .addDecorator(withProvider)
  .add('initial', () => (
    <Header />
  ))