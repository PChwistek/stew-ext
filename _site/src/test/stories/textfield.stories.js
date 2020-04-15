import React from 'react'
import { storiesOf } from '@storybook/react'
import Textfield from 'Common/TextField'

storiesOf('Textfield', module)
  .add('empty', () => (
    <div style={ { 'padding': '40px' }}>
      <Textfield value={ '' } setValue={ () => {} } />
    </div>
  )).add('some value', () => (
    <div style={ { 'padding': '40px' }}>
      <Textfield value={ 'test' } setValue={ () => {} } />
    </div>
  )).add('has error', () => (
    <div style={ { 'padding': '40px' }}>
      <Textfield value={ 'test' } setValue={ () => {} } error='Some error' />
    </div>
  ))
