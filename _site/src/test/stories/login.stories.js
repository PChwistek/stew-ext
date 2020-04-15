import React from 'react'
import { storiesOf } from '@storybook/react'
import Login from 'Popup/Login'
import TestProvider from './TestProvider'
import store from '../testStore'

const withProvider = (story) => (
  <TestProvider store={store}>
    { story() }
  </TestProvider>
)

storiesOf('Login', module)
  .addDecorator(withProvider)
  .add('initial', () => (
    <Login />
  ))