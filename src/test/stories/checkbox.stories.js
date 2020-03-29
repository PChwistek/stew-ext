import React from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from 'Common/Checkbox'

storiesOf('Checkbox', module)
  .add('unchecked', () => (
    <div style={ { 'padding': '40px' }}>
      <Checkbox label='Test' checked={ false } setValue={ () => {} } />
    </div>
  ))
  .add('checked', () => (
    <div style={ { 'padding': '40px' }}>
      <Checkbox label='Test' checked={ true } setValue={ () => {} } />
    </div>
  ))