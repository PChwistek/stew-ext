import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

const ModalBase = props => {
  return (
    <CSSTransition in={ props.show } timeout={300} classNames={ 'modal' } unmountOnExit>
      <div className="modal">
        <div className="modal__container">
          <div className="modal__exit" onClick={ props.closeModal } />
          { props.children }
        </div>
      </div>
    </CSSTransition>
  )
}


ModalBase.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node
}


export default ModalBase