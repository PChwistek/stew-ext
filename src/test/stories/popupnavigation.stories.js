import React from 'react'
import { storiesOf } from '@storybook/react'
import Navigation from '../../containers/popup/navigation'

storiesOf('Popup navigation', module)
  .add('standard', () => (
    <Navigation />
  ))