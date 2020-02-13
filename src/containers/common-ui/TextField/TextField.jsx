import React,{ Component } from 'react'
import PropTypes from 'prop-types'

class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    }
  }

  changeValue(event) {
    const value = event.target.value;
    const { validate, setValue } = this.props

    if(validate) {
      const { isValid, error } = validate(value)
      if(isValid) {
        this.setState({ value, error })
        setValue(value)
      }

    } else {
      setValue(value)
      this.setState({ value, error: "" })
    }
    
  }

  handleKeyPress(event) {
    const { onEnter, clearOnEnter } = this.props
    if (event.which === 13) {
      onEnter && onEnter()
      clearOnEnter && this.setState({ value: '' })
      // this.setState({ value: this.props.predicted })
    }
  }

  render() {
    const { active, error, label } = this.state
    const { predicted, locked, type, value, autoFocus } = this.props
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"} && ${error && 'error'}`

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <input
          id={1}
          type={ type }
          value={value}
          autoFocus={ autoFocus }
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}

TextField.propTypes = {
  clearOnEnter: PropTypes.bool,
  locked: PropTypes.bool,
  onEnter: PropTypes.func,
  active: PropTypes.bool,
  predicted: PropTypes.any,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  validate: PropTypes.func,
  setValue: PropTypes.func.isRequired,
}
  
export default TextField