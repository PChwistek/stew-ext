import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'


const ModalBase = props => {

  function onOutsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.closeModal()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [ref])
  }

  const wrapperRef = useRef(null)
  onOutsideClick(wrapperRef)

  return (
    <CSSTransition in={ props.show } timeout={300} classNames={ 'modal' } unmountOnExit>
      <div className="modal">
        <div className="modal__container" ref={ wrapperRef }>
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