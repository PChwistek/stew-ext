import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from 'Common/Button'

storiesOf('Button', module)
  .add('normal', () => (
    <div style={ { 'padding': '40px' }}>
      <Button text='Test' type='primary' onClick={ () => {} } />
    </div>
  ))
  .add('tertiary', () => (
    <div style={ { 'padding': '40px' }}>
      <Button text='Test' type='secondary' onClick={ () => {} } />
    </div>
  ))
