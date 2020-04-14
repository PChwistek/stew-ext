import React from 'react'
import { storiesOf } from '@storybook/react'
import SlideIn from 'Popup/SlideIn'

storiesOf('SlideIn', module)
  .add('initial', () => (
    <SlideIn visible={ false } onCloseClick={ () => {} }>
      <div style={ { 'padding': '50px' } }> test stuff... </div>
    </SlideIn>
  ))
  .add('visible', () => (
    <SlideIn visible={ true } onCloseClick={ () => {} }>
      <div style={ { 'padding': '50px' } }> test stuff... </div>
    </SlideIn>
  ))
