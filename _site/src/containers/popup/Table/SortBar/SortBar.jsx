import React, { useState } from "react"
import PropTypes from 'prop-types'
import Dropdown from '../Dropdown'

import planet from 'Assets/planet.png'
import star2 from 'Assets/star2.png'

const options = [
  {
    text: 'All',
    src: planet,
    value: 'all'
  },
  // {
  //   text: 'Created by me',
  //   src: '../../../../assets/astronaut.png'
  // },
  // {
  //   text: 'Used Recently',
  //   src: '../../../../assets/rocket.png',
  //   value: 'recently'
  // },
  {
    text: 'Favorites',
    src: star2,
    value: 'favorites'
  },
  // {
  //   text: 'Created by others',
  //   src: '../../../../assets/alien-1.png'
  // }
]

export default function SortBar(props) {
  const selectedIndex = options.findIndex(opt => opt.value === props.sortedBy)
  const [dropdownText, setDropdownText] = useState( options[selectedIndex] || undefined)

  function handleSet(value) {
    props.setSortBy(value.value)
    setDropdownText(value)
  }
  
  return(
    <div className='table__sort-bar'>
      <div className='table__sort-bar-title'>
        { `${props.numResults} ${props.numResults == 1 ? 'result' : 'results' } for '${ props.terms }'` }
      </div>
      <div className='table__sort-bar-dropdown-container'>
        <Dropdown
          placeholder={ options[selectedIndex || 0] }
          value={ dropdownText }
          onChange={v => handleSet(v)}
          options={ options }
        />
      </div>
    </div>
  )
}

SortBar.propTypes = {
  title: PropTypes.string.isRequired,
  terms: PropTypes.string.isRequired,
  numResults: PropTypes.string.isRequired
}