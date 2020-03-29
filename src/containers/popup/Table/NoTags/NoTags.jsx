import React from 'react'
import PropTypes from 'prop-types'

export default function NoTags(props) {
  return (
      <div className='preview-tags'>
        { props.text }
      </div>
  )
}

NoTags.propTypes = {
  text: PropTypes.string.isRequired,
}