import React from 'react'
import SortBar from './SortBar'
import Button from '../../common-ui/Button'
import { getSrc } from '../utils'

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

export default function Table(props) {
  const { onRecipeNameClicked, selectRow, launchRecipe, selectNextRow, selectPreviousRow, slideOutVisible } = props
  const { selectedRow = 0, results = [], searchTerms } = props.search
  document.onkeydown = checkKey

  function checkKey(e) {
    e = e || window.event;
    if(!slideOutVisible) {
      if (e.keyCode == '38') {
        selectPreviousRow()
      } else if (e.keyCode == '40') {
        selectNextRow()
      } else if (e.keyCode == 13) {
        launchRecipe(results[selectedRow])
      }
    } 
    
    if (e.ctrlKey) {
      onRecipeNameClicked(selectedRow)
    }
  }

  return (
    <div>
      <SortBar title={ 'All' } numResults={ `${results.length}` } terms={ searchTerms } />
      <div className={ 'table__container'} onKeyUp={ checkKey}>
        {
          results.length <= 0 
            ? <div className={ 'table__no-results' }> 
                No results :(
              </div>
            : results.map( (row, index) => (
              <div key={ 'row' + index } onClick={ () => selectRow(index) } className={ index == selectedRow ? 'table__row table__row--selected' : 'table__row'}>
                <div className={ 'table__row__top'}>
                  <div className={ 'table__row__title '} onClick={ () => onRecipeNameClicked(index) }>
                    { row.name }
                  </div>
                  <div className={ 'table__row__attributes '}>
                    {
                      row.attributes.map(attrib => (
                        <div key={ attrib} className={ 'tooltip' }>
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
                    <div key={ tag } className={ 'tag-result' }>
                      { tag }
                    </div>
                  ))
                }
                </div>
                <div className={ 'table__row__launch' }>
                  <Button text={ 'Launch' } type={ 'primary' } onClick={ () => launchRecipe(row)} />
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}