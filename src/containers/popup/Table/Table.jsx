import React, { useState } from 'react'
import SortBar from './SortBar'
import Button from '../../common-ui/Button'

function getSrc(attribute) {
  switch(attribute){
    case 'Popular': 
      return '../../../assets/fire.png'
    case 'Favorite':
      return '../../../assets/star1.png'
  }
}

export default function Table(props) {
  const { onRowSelect } = props
  const { selectedRow = 0, results } = props.search
  console.log(props)
  return (
    <div>
      <SortBar title={ 'All' }/>
      <div className={ 'table__container' }>
        {
          results.map( (row, index) => (
            <div className={ index == selectedRow ? 'table__row table__row--selected' : 'table__row'}>
              <div className={ 'table__row__title '} onClick={ onRowSelect }>
                { row.name }
                <div className={ 'table__row__attributes '}>
                  {
                    row.attributes.map(attrib => (
                      <div className={ 'tooltip' }>
                        <img src={ getSrc(attrib) } className={ `table__row__attribute-icon` }/>
                        <span className="tooltiptext"> { attrib }</span>
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