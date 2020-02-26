import React, { useState } from "react"
import PropTypes from 'prop-types'
import Dropdown from '../Dropdown'

const options = [
  {
    text: 'All',
    src: '../../../../assets/planet.png',
  },
  {
    text: 'Created by me',
    src: '../../../../assets/astronaut.png'
  },
  {
    text: 'Used Recently',
    src: '../../../../assets/rocket.png'
  },
  {
    text: 'Favorites',
    src: '../../../../assets/star2.png'
  },
  {
    text: 'Created by others',
    src: '../../../../assets/alien-1.png'
  }
]

export default function SortBar(props) {
  const [vegetagle, setVegetable] = useState(undefined);
  
  return(
    <div className='table__sort-bar'>
      <div className='table__sort-bar-title'>
        { `${props.numResults} ${props.numResults == 1 ? 'result' : 'results' } for '${ props.terms }'` }
      </div>
      <div className='table__sort-bar-dropdown-container'>
        <Dropdown
          placeholder={ options[0] }
          value={ vegetagle }
          onChange={v => setVegetable(v)}
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