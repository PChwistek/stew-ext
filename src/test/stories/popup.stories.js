import React from 'react'
import { storiesOf } from '@storybook/react'
import { Popup } from '../../containers/popup/Popup'

storiesOf('Popup', module)
  .add('with text', () => (
    <Popup dispatch={ () => {} }/>
  ))