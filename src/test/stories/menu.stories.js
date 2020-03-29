import React from 'react'
import { storiesOf } from '@storybook/react'
import Menu from 'Popup/Menu'
import TestProvider from './TestProvider'
import store from '../testStore'

const withProvider = (story) => (
  <TestProvider store={store}>
    { story() }
  </TestProvider>
)

storiesOf('Menu', module)
  .addDecorator(withProvider)
  .add('initial', () => (
    <Menu />
  ))
  .add('showing', () => (
    <Menu open />
  ))