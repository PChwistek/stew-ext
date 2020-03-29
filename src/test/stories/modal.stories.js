import React from 'react'
import { storiesOf } from '@storybook/react'
import ConfirmModal from 'Popup/Modal/ConfirmModal'

storiesOf('Confirm Modal', module)
  .add('initial', () => (
    <ConfirmModal />
  )).add('showing', () => (
    <ConfirmModal title='Test title. Are you sure?' show onYesClick={ () => {}} onNoClick={ ()=> {} } closeModal={ () => {} }>
    </ConfirmModal>
  ))

