import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

class SearchTextField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || '',
      error: props.error || '',
      label: props.label || 'Label'
    }
  }

  changeValue(event) {
    const value = event.target.value
    const { validate, setValue } = this.props

    if(validate) {
      const { isValid, error } = validate(value)
      if(isValid) {
        this.setState({ value, error })
        setValue(value)
      }

    } else {
      setValue(value)
      this.setState({ value, error: '' })
    }
    
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted })
    }
  }

  render() {
    const { active, value, error, label } = this.state
    const { predicted, locked, type } = this.props
    const fieldClassName = `search-field ${(locked ? active : active || value) &&
      'active'} ${locked && !active && 'locked'} && ${error && 'error'}`

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <div className={ 'search-field__image-container'}>
          <img src={ '../../../../assets/search.png' } className='search-field__image' />
        </div>
        <input
          id={1}
          type={ type }
          value={value}
          autoFocus
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
          autoComplete="off"       
        />
        <label htmlFor={1} className={error && 'error'}>
          {error}
        </label>
      </div>
    )
  }
}

SearchTextField.propTypes = {
  locked: PropTypes.bool,
  active: PropTypes.bool,
  predicted: PropTypes.any,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  validate: PropTypes.func,
  setValue: PropTypes.func.isRequired,
}
  
export default SearchTextField