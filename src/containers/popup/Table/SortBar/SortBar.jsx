import React from 'react'
import PropTypes from 'prop-types'

export default function SortBar(props) {
  return(
    <div className='table__sort-bar'>
      <div className='table__sort-bar-title'>
        { props.title }
      </div>
      <div className='table__sort-bar-icons'>
        <div>
          <img src={ '../../../../assets/creativity.png' } className='table__sort-bar-icon' />
        </div>
        <div>
          <img src={ '../../../../assets/sort.png' } className='table__sort-bar-sort'  />
        </div>
      </div>
    </div>
  )
}

SortBar.propTypes = {
  title: PropTypes.string.isRequired
}