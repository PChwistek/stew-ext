import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../common-ui/Button'
import ModalBase from '../ModalBase'

export const ConfirmModal = (props) => {
  return (
    <ModalBase show={ props.show } closeModal={ props.closeModal } >
      <h2> { props.title } </h2>
      <div className={ 'confirm-modal__buttons' }>
        <div className={ 'confirm-modal__button'}>
          <Button onClick={ props.onYesClick } type='secondary' text='Yes' />
        </div>
        <div className={ 'confirm-modal__button'}>
          <Button onClick={ props.onNoClick } type='secondary' text='No' />
        </div>
      </div>
    </ModalBase>
  )
}

ConfirmModal.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func,
  onYesClick: PropTypes.func,
  onNoClick: PropTypes.func,
  title: PropTypes.string
}

export default ConfirmModal