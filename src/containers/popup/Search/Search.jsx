import React from 'react'
import PropTypes from 'prop-types'
import SearchTextField from './SearchTextfield'

export default function Search(props) {
  const { onPlusClick } = props
  return (
    <div className='search'>
      <div className='search__content'>
        <div className="search__field">
          <SearchTextField type={ 'text' } label={ 'Search for recipes...' } />
        </div>
        <div className='search__plus' onClick={ onPlusClick } >
          <img src={ '../../../assets/plus-green.png' } className='search__image' />
        </div>
      </div>
      <hr className="divider--heavy" />
    </div>
  )
}

Search.propTypes = {
  onPlusClick: PropTypes.func,
}