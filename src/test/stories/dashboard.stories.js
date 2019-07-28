import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dashboard } from '../../containers/dashboard/Dashboard'

storiesOf('Dashboard', module)
  .add('with text', () => (
    <Dashboard />
  ))