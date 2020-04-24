import React from 'react'
import PropTypes from 'prop-types'

function getAppropriateStyle(prop) {
  switch(prop) {
    case 'primary':
      return 'button button--primary'
    case 'secondary':
      return 'button button--secondary'
    case 'small primary':
      return 'button button--small--primary'
  }
}

const Button = ({ type, text, onClick }) => {
  return (
    <div className={ getAppropriateStyle(type) } onClick={ onClick }>
      <p className="button__text"> { text } </p>
    </div>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func
}

export default Button