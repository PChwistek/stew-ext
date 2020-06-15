import React, { useState } from "react"
import PropTypes from 'prop-types'
import Dropdown from '../Dropdown'

import planet from 'Assets/planet.png'
import star2 from 'Assets/star2.png'
import rocket from 'Assets/rocket.png'
import repoIcon from 'Assets/repo.png'

const options = [
  {
    text: 'All',
    src: planet,
    value: 'all'
  },
  {
    text: 'Used Recently',
    src: rocket,
    value: 'recently'
  },
  {
    text: 'Favorites',
    src: star2,
    value: 'favorites'
  }
]

export default function SortBar(props) {
  const repos = props.repos.map(item => ({ 
    text: item.name,
    value: item.repoId,
    src: repoIcon,
  }))

  const optionSorts = options.concat(repos)
  const selectedIndex = options.findIndex(opt => opt.value === props.sortedBy)
  const [dropdownText, setDropdownText] = useState( options[selectedIndex] || undefined)
  function handleSet(selection) {
    props.setSortBy(selection.value)
    setDropdownText(selection)
  }
  
  return(
    <div className='table__sort-bar'>
      <div className='table__sort-bar-title'>
        { `${props.numResults} ${props.numResults == 1 ? 'result' : 'results' } for '${ props.terms }'` }
      </div>
      <div className='table__sort-bar-dropdown-container'>
        <Dropdown
          placeholder={ optionSorts[selectedIndex || 0] }
          value={ dropdownText }
          onChange={v => handleSet(v)}
          options={ optionSorts }
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