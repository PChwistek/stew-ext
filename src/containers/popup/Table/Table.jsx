import React, { createRef } from 'react'
import { CSSTransition } from "react-transition-group"
import SortBar from './SortBar'
import Button from '../../common-ui/Button'
import { getSrc } from '../utils'
import PreviewTabs from './PreviewTabs'
import NoTags from './NoTags'

// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

export default function Table(props) {
  const { onRecipeNameClicked, selectRow, launchRecipe, selectNextRow, selectPreviousRow, slideOutVisible, setSortBy, loggedIn } = props
  const { selectedRow = 0, results = [], searchTerms, sortedBy, favorites } = props.search

  const refDictionary = {}
  const keyMap = {}

  function handleRefs(index) {
    refDictionary[index] = createRef()
    return refDictionary[index]
  }

  function checkKey(e) {
    e = e || window.event
    keyMap[e.code] = e.type == 'keydown';
    if(!slideOutVisible && loggedIn) {
      if (keyMap['ArrowUp']) {
        selectPreviousRow()
        refDictionary[selectedRow].current.focus()
      } else if (keyMap['ArrowDown']) {
        selectNextRow()
        refDictionary[selectedRow].current.focus()
      } else if (keyMap['ShiftLeft'] && keyMap['Enter']) {
        launchRecipe(results[selectedRow])
      }
    } 
    
    if (e.ctrlKey) {
      onRecipeNameClicked(selectedRow)
    }
  }
  return (
    <div>
      <SortBar title={ 'All' } numResults={ `${results.length}` } terms={ searchTerms } setSortBy={ setSortBy } sortedBy={ sortedBy } />
      <div className={ 'table__container'}>
      {
        results.length <= 0 
          ? <div className={ 'table__no-results' }> 
              No results :(
            </div>
          : results.map( (row, index) => (
              <div key={ 'row' + index } tabIndex={-1} onClick={ () => selectRow(index) } ref={ handleRefs(index) } className={ index == selectedRow ? 'table__row table__row--selected' : 'table__row'}>
                <div className={ 'table__row__top'}>
                  <div className={ 'table__row__title '} onClick={ () => onRecipeNameClicked(index) }>
                    { row.name }
                  </div>
                  <div className={ 'table__row__attributes '}>
                    {
                      favorites.findIndex(recipe => recipe == row._id) > -1
                        && <div key={ 'fav' + index } className={ 'tooltip' }>
                          <img src={ getSrc('Favorite') } className={ `table__row__attribute-icon` }/>
                          <span className="tooltiptext"> { 'Favorite' }</span>
                        </div>
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
                  <NoTags open={ index == selectedRow && row.tags.length <= 0 } text={ 'No tags' } />
                </div>
                <PreviewTabs key={ 'preview' + index }
                  open={ index == selectedRow } 
                  config={ row.config } 
                  extraPadding={ row.tags.length <= 0 }
                /> 
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