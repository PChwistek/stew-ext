import React, { useState } from 'react'
import SortBar from './SortBar'
import Button from '../../common-ui/Button'

const rows = [
  {
    name: 'React Development',
    author: 'JubJubTumTum',
    tags: [
      'react',
      'webdevelopment',
      'fast'
    ],
    attributes: [
      'Popular', 
      'Favorite'
    ],
    usedBy: '1.4K',
    favorites: '400'
  },
  {
    name: 'React Development',
    author: 'JubJubTumTum',
    tags: [
      'react',
      'webdevelopment',
      'fast'
    ],
    attributes: [
      'Popular', 
      'Favorite'
    ],
    usedBy: '1.4K',
    favorites: '400'
  }
]

function getSrc(attribute) {
  switch(attribute){
    case 'Popular': 
      return '../../../assets/fire.png'
    case 'Favorite':
      return '../../../assets/star1.png'
  }
}

export default function Table(props) {
  const { selectedRow = 0 } = props
  return (
    <div>
      <SortBar title={ 'All' }/>
      <div className={ 'table__container' }>
        {
          rows.map( (row, index) => (
            <div className={ index == selectedRow ? 'table__row table__row--selected' : 'table__row'}>
              <div className={ 'table__row__title '}>
                { row.name }
                <div className={ 'table__row__attributes '}>
                  {
                    row.attributes.map(attrib => (
                      <div className={ 'tooltip' }>
                        <img src={ getSrc(attrib) } className={ `table__row__attribute-icon` }/>
                        <span class="tooltiptext"> { attrib }</span>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className={ 'table__row__author '}>
                { row.author } shared 3 months ago
              </div>
              <div className={ 'table__row__tags'}>
              {
                row.tags.map(tag => (
                  <div className={ 'tag-result' }>
                    { tag }
                  </div>
                ))
              }
              </div>
              <div className={ 'table__row__launch' }>
                <Button text={ 'Launch' } type={ 'secondary' } />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}