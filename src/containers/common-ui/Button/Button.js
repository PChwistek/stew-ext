import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

function getAppropriateStyle(prop) {
  switch(prop) {
    case 'primary':
      return 'button button--primary'
    case 'secondary':
      return 'button button--secondary'
  }
}

const Button = ({ type, text, actionOnClick }) => {
  return (
    <div className={ getAppropriateStyle(type) } onClick={ actionOnClick }>
      <p className="button__text"> { text } </p>
    </div>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  actionOnClick: PropTypes.func
}

export default Button