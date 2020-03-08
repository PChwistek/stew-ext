import React, { useEffect, useState, useRef } from "react"
import PropTypes from 'prop-types'

const Dropdown = ({ value, options, placeholder, onChange }) => {
  const node = useRef()
  const [open, setOpen] = useState(false)

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setOpen(false)
  }

  const handleChange = selectedValue => {
    console.log(selectedValue)
    onChange(selectedValue)
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div ref={node} className="dropdown">
      <div className="dropdown-toggler" onClick={e => setOpen(!open)}>
        <div>
          <img src={ (value && value.src) || placeholder.src } className='dropdown-toggler__all-icon' />
        </div>
         <div>
          { (value && value.text) || placeholder.text }
        </div>
        <div>
          <img src={ '../../../../assets/sort.png' } className='dropdown-toggler__icon' />
        </div>
      </div>
      {open && (
        <ul className="dropdown-menu">
          {options.map(opt => (
            <li key={ opt.text } className="dropdown-menu-item" onClick={e => handleChange(opt)}>
                <div>
                  <img src={ opt.src } className='dropdown-menu-item__icon' />
                </div>
                <div>
                  { opt.text }
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown