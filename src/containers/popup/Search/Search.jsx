import React from 'react'
import PropTypes from 'prop-types'
import SearchTextField from './SearchTextfield'

import greenPlus from 'Assets/plus-green.png'

export default function Search(props) {
  const { onPlusClick, setSearchTerms, terms } = props
  return (
    <div className='search' >
      <div className='search__content'>
        <div className="search__field">
          <SearchTextField type={ 'text' } focused={ true } label={ 'Search for recipes...' } setValue={ setSearchTerms } value={ terms } />
        </div>
        <div className='search__plus' onClick={ onPlusClick } >
          <img src={ greenPlus } className='search__image' />
        </div>
      </div>
      <hr className="divider--heavy" />
    </div>
  )
}

Search.propTypes = {
  onPlusClick: PropTypes.func.isRequired,
  setSearchTerms: PropTypes.func.isRequired,
  terms: PropTypes.string.isRequired
}