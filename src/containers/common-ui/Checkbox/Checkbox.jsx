import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = props => {
  
  return (
    <label className="checkbox-container">              
      <div className="checkbox__small-text">
        { props.label }        
      </div>
      <input type="checkbox" checked={ props.checked } onChange={ () => props.setValue(!props.checked) } />
      <span className="checkmark"></span>
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired
}

export default Checkbox