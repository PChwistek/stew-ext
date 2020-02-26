import React from 'react'
import IconRow from './IconRow'
import { getSrc } from '../../utils'
import Button from '../../../common-ui/Button'

const ViewRecipe = (props) => {
  const { selectedRecipe, launchRecipe } = props
  return ( 
      <div className={ 'detailtab__details'}>
      {
        selectedRecipe && <div>
          <div className={ 'detailtab__details__title'}>
            { selectedRecipe && selectedRecipe.name }
          </div>
          <div>
            Published by: { selectedRecipe && selectedRecipe.author }
            <div>
            {
              selectedRecipe.attributes.map(attrib => {
                <img key={ attrib } src={ getSrc(attrib) } />
              })
            } 
            </div>
          </div>
          <div>
            <div className={ 'table__row__tags'}>
                {
                  selectedRecipe && selectedRecipe.tags.map(tag => (
                    <div key={ tag } className={ 'tag-result' }>
                      { tag }
                    </div>
                  ))
                }
                </div>
          </div>
          <div className={ 'detailtab__launch' }>
            <Button text={ 'Launch' } type={ 'primary' } onClick={ () => launchRecipe(selectedRecipe || {}) } />
          </div>
          <IconRow />
        </div>
      }
    </div>
  )
}

export default ViewRecipe